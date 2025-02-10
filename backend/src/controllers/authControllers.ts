import { IncomingMessage, ServerResponse } from "http"
import { getReqBody, sendResponse, isAllKeysFilled, useCookie, hashPassword, encryptToken, comparePassword } from "../utils"

const { UserModel } = require('../models/User')

const logIn = async (req: IncomingMessage, res: ServerResponse) => {

    if (req.method !== 'POST') return sendResponse(res, 400, 'Not acceptable method')

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
            sendResponse(res, 404, { message: 'No enough credential data for login.' })
            return
        }

        const userData = await UserModel.findOne({ $or: [{ phone: payload }, { username: payload }] })
        const isPasswordTrue = userData?.password && await comparePassword(password, userData.password)

        if (!userData || !isPasswordTrue) return sendResponse(res, 401, { message: 'Invalid credentials provided.' })

        const tokenPayloadData = { _id: userData._id, phone: userData.phone, username: userData.username }
        const encryptedToken = await encryptToken(tokenPayloadData)

        const token = useCookie(res, 200).set('token', encryptedToken)
        res.end(JSON.stringify({ message: 'LoggedIn successfully. (:', data: userData, token }))

    } catch (error) {
        console.log('the error: ', error)
        res.end({ message: error?.toString()! })
    }

}

const signUp = async (req: IncomingMessage, res: ServerResponse) => {

    if (req.method !== 'POST') return sendResponse(res, 404, { message: 'Method not supported' })

    try {

        const data = await getReqBody(req)

        if (!isAllKeysFilled(data!)) {
            sendResponse(res, 404, { message: 'Please fill all needed data' })
            return
        }

        const { phone, email, username, password } = data as any
        if (!phone || !username || !password) return sendResponse(res, 404, { message: 'Not all credentials received btw.' });

        const existingUser = await UserModel.findOne({ $or: [{ phone }, { username }, { email }] })
        const messages: string[] = [];

        if (existingUser) {
            if (existingUser.phone === phone) {
                messages.push('The phone number is already taken.');
            }
            if (existingUser.username === username) {
                messages.push('The username is already taken.');
            }
            if (existingUser.email === email) {
                messages.push('The email address is already in use.');
            }
        }

        if (existingUser) {
            sendResponse(res, 404, { message: messages })
            return
        }

        const hashedPassword = await hashPassword(password)
        const userData = await UserModel.create({ ...data!, password: hashedPassword })

        const tokenPayloadData = { _id: userData._id, phone: userData.phone, username: userData.username }
        const encryptedToken = await encryptToken(tokenPayloadData)

        useCookie(res, 201).set('token', encryptedToken)
        res.end(JSON.stringify({ message: 'You signedUp successfully btw.' }))

    } catch (error) {

        //@ts-ignore
        if (error?.errors) {
            //@ts-ignore
            const errors = Object.values(error.errors).map(err => err?.message)
            return sendResponse(res, 404, { errors })
        }

        sendResponse(res, 500, error!)
    }

}

const logOut = async (req: IncomingMessage, res: ServerResponse) => {
    useCookie(res, 200).remove('token');
    res.end(JSON.stringify({ message: 'You logOut successfully.' }))
}

const getMe = async (req: IncomingMessage, res: ServerResponse) => {

    if (req.method !== 'GET') return sendResponse(res, 403, { message: "Method not allowed" })

    try {

        const userData = (req as any)?.user
        if (!userData) return sendResponse(res, 404, { message: 'No user found out here haha.' })

        sendResponse(res, 200, userData!)
    } catch (error) {
        sendResponse(res, 404, error!)
    }

}

module.exports = {
    logIn,
    signUp,
    logOut,
    getMe,
}
