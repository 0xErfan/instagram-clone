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
        // TODO: login with phone number btw.

        const credentials = await getReqBody(req)
        const { payload, password } = credentials as any || {};

        if (
            !(Boolean(payload))
            ||
            !password?.toString().trim().length
        ) {
            sendResponse(res, 404, { errors: ['No enough credential data for login.'], success: false })
            return
        }

        const userData = await UserModel.findOne({ $or: [{ phone: payload }, { username: payload }] })
        const isPasswordTrue = userData?.password && await comparePassword(password, userData.password)

        if (!userData || !isPasswordTrue) return sendResponse(res, 401, { errors: ['Invalid credentials provided.'], success: false })

        const tokenPayloadData = { _id: userData._id, phone: userData.phone, username: userData.username }
        const encryptedToken = await encryptToken(tokenPayloadData)

        const token = useCookie(res, 200).set('token', encryptedToken)

        res.end(JSON.stringify({
            message: 'You LoggedIn successfully. (:',
            success: true,
            data: {
                userData,
                token
            }
        }))

    } catch (error) {
        console.log('the error: ', error)
        res.end({ errors: [error?.toString()!], success: false })
    }

}

const signUp = async (req: IncomingMessage, res: ServerResponse) => {

    if (req.method !== 'POST') return sendResponse(res, 404, { errors: ['Method not supported'], success: false })

    try {

        const data = await getReqBody(req)

        if (!isAllKeysFilled(data!)) {
            sendResponse(res, 404, { errors: ['Please fill all needed data'], success: false });
            return;
        }

        const { payload, username, password } = data as any
        if (!username || !password) return sendResponse(res, 404, { errors: ['Not all credentials received btw.'], success: false });

        const existingUser = await UserModel.findOne({ $or: [{ phone: payload }, { username: payload }, { email: payload }] })
        const messages: string[] = [];

        if (existingUser) {
            if (existingUser.phone === payload) {
                messages.push('The phone number is already taken.');
            }
            if (existingUser.username === username) {
                messages.push('The username is already taken.');
            }
            if (existingUser.email === payload) {
                messages.push('The email address is already in use.');
            }
        }

        if (existingUser) return sendResponse(res, 404, { errors: messages, success: false });

        const hashedPassword = await hashPassword(password)
        const userData = await UserModel.create({ ...data!, password: hashedPassword })

        const tokenPayloadData = { _id: userData._id, phone: userData.phone, username: userData.username }
        const encryptedToken = await encryptToken(tokenPayloadData)

        const newToken = useCookie(res, 201).set('token', encryptedToken)

        sendResponse(res, 201, {
            message: 'You signed up successfully btw.',
            data: { token: newToken, userData },
            success: true
        })

    } catch (error) {

        //@ts-ignore
        if (error?.errors) {
            //@ts-ignore
            const errors = Object.values(error.errors).map(err => err?.message)
            return sendResponse(res, 404, { errors, success: false })
        }

        sendResponse(res, 500, { errors: [error!], success: false })

    }

}

const logOut = async (req: IncomingMessage, res: ServerResponse) => {
    useCookie(res, 200).remove('token');
    sendResponse(res, 200, { message: 'You logged out successfully.', success: true })
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
