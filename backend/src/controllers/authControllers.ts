import { IncomingMessage, ServerResponse } from "http"
import { getReqBody, sendResponse, isAllKeysFilled, useCookie, hashPassword, comparePassword } from "../utils"
import TokenManager from "../classes/TokenManager"

const { encryptToken } = TokenManager()

const { UserModel } = require('../models/User')

const logIn = async (req: IncomingMessage, res: ServerResponse) => {

    if (req.method !== 'POST') {
        sendResponse(res, 400, { errors: ['Method not allowed'], success: false })
        return
    }

    try {

        // TODO: add type safety.
        // TODO: login with phone number or email btw.

        const credentials = await getReqBody(req)

        // payload: phone | email | username
        const { payload, password } = credentials as any || {};

        if (
            !(Boolean(payload))
            ||
            !password?.toString().trim().length
        ) {
            sendResponse(res, 404, { errors: ['Please fill all form fields.'], success: false })
            return
        }

        // Determine whether payload is phone, email, or username
        let query: any = {};
        if (/^\d{10,15}$/.test(payload)) {
            query.phone = payload;
        } else if (/^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,}$/.test(payload)) {
            query.email = payload.toLowerCase();
        } else {
            query.username = payload.toLowerCase();
        }

        const userData = await UserModel.findOne(query)
        const isPasswordTrue = userData?.password && await comparePassword(password, userData.password)

        if (!userData || !isPasswordTrue) return sendResponse(res, 401, { errors: ['Invalid credentials provided.'], success: false })

        const tokenPayloadData = { _id: userData._id, phone: userData.phone, username: userData.username }
        const encryptedToken = await encryptToken(tokenPayloadData)

        const token = useCookie().set('token', encryptedToken)

        sendResponse(
            res,
            200,
            { message: 'You LoggedIn successfully', success: true, data: { userData } },
            token
        )

    } catch (error) {
        console.log('the error: ', error)
        res.end({ errors: [error?.toString()!], success: false })
    }

}

const signUp = async (req: IncomingMessage, res: ServerResponse) => {

    if (req.method !== 'POST') {
        return sendResponse(res, 404, { errors: ['Method not supported'], success: false });
    }

    try {

        const data = await getReqBody(req);

        if (!isAllKeysFilled(data!)) {
            sendResponse(res, 404, { errors: ['Please fill all the form fields.'], success: false });
            return;
        }

        const { payload, username, password, fullname } = data as any;
        const normalizedUsername = username.toLowerCase();
        const messages: string[] = [];

        let payloadField: 'email' | 'phone' | null = null;
        let normalizedPayload: string | null = null;

        if (/^\d{10,15}$/.test(payload)) {
            payloadField = 'phone';
            normalizedPayload = payload;
        } else if (/^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,}$/.test(payload)) {
            payloadField = 'email';
            normalizedPayload = payload.toLowerCase();
        } else {
            return sendResponse(res, 404, { errors: ['Invalid email or phone number format.'], success: false });
        }

        const orConditions: Record<string, string>[] = [
            { username: normalizedUsername },
        ];

        payloadField && orConditions.push({ [payloadField]: normalizedPayload! });

        const existingUser = await UserModel.findOne({ $or: orConditions });

        if (existingUser) {
            if (existingUser.username === normalizedUsername) messages.push('The username is already taken.');
            if (existingUser.email === normalizedPayload && payloadField === 'email') messages.push('The email address is already in use.');
            if (existingUser.phone === normalizedPayload && payloadField === 'phone') messages.push('The phone number is already taken.');
            return sendResponse(res, 404, { errors: messages, success: false });
        }

        const userPayload: any = {
            fullname,
            username: normalizedUsername,
            password: await hashPassword(password),
        };

        userPayload[payloadField] = normalizedPayload;

        const userData = await UserModel.create(userPayload);

        const tokenPayloadData = { _id: userData._id, phone: userData.phone, username: userData.username };
        const encryptedToken = await encryptToken(tokenPayloadData);

        const newToken = useCookie().set('token', encryptedToken);

        sendResponse(res, 201, {
            message: 'You signed up successfully btw.',
            data: { userData },
            success: true
        }, newToken);

    } catch (error) {

        //@ts-ignore
        if (error?.errors) {
            //@ts-ignore
            const errors = Object.values(error.errors).map(err => err?.message);
            return sendResponse(res, 404, { errors, success: false });
        }

        //@ts-ignore
        const errors = error?.code === 11000 ? Object.entries(error?.keyValue).map(([key, val]) => `${key} field value (${val}) is already taken, shall we try something else?`) : [error?.toString];
        sendResponse(res, 500, { errors, success: false });

    }
};

const logOut = async (req: IncomingMessage, res: ServerResponse) => {
    const removedTokenHeader = useCookie().remove('token');
    sendResponse(res, 200, { message: 'You logged out successfully.', success: true }, removedTokenHeader)
}

const getMe = async (req: IncomingMessage, res: ServerResponse) => {

    if (req.method !== 'POST') {
        sendResponse(res, 403, { errors: ["Method not allowed"], success: false })
        return;
    }

    try {
        const userData = (req as any)?.user
        if (!userData) return sendResponse(res, 404, { errors: ['User not found.'], success: false })
        sendResponse(res, 200, { message: '', data: { userData }, success: true })
    } catch (error) {
        sendResponse(res, 404, { errors: [error!], success: false })
    }

}

module.exports = {
    logIn,
    signUp,
    logOut,
    getMe,
}
