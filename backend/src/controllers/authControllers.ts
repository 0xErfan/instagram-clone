import { IncomingMessage, ServerResponse } from "http"
import { getReqBody, sendResponse, isAllKeysFilled, useCookie, hashPassword, decryptToken, encryptToken, comparePassword } from "../utils"

const UserModel = require('../models/User')

const logIn = async (req: IncomingMessage, res: ServerResponse) => {

    if (req.method !== 'POST') return sendResponse(res, 400, 'Not acceptable method')

    try {

        // TODO: add type safety.
        // TODO: login with phone number btw.

        const { set, remove } = useCookie(res, 200)

        const credentials = await getReqBody(req)
        const { phone, username, password } = credentials as any;

        const userData = await UserModel.findOne({ $or: [{ phone }, { username }] })
        if (!userData) return sendResponse(res, 400, { message: 'No user found with this credentials.' });

        const isPasswordTrue = await comparePassword(password, userData.password)

        if (!isPasswordTrue) {
            remove('token')
            res.end(JSON.stringify({ message: 'Wrong password buddy.' }))
            return;
        }

        const tokenPayloadData = { _id: userData._id, phone: userData.phone, username: userData.username }
        const encryptedToken = await encryptToken(tokenPayloadData)

        set('token', encryptedToken)
        res.end(JSON.stringify({ message: 'LoggedIn successfully.' }))

    } catch (error) {
        res.end({ message: error! })
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

        const isUserExist = await UserModel.findOne({ $or: [{ username }, { phone }] }) // or email

        if (isUserExist) {
            sendResponse(res, 404, { message: `${phone || email || username} is taken by others` })
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

    try {
        const token = req.headers['authorization']?.split(' ')[1]
        if (!token) return sendResponse(res, 403, { message: "You're not welcomed here, sorry." });

        const decryptedToken = await decryptToken(token)
        const userData = await UserModel.findOne({ _id: decryptedToken?._id })

        if (!userData) return sendResponse(res, 404, { message: 'No user found with this credentials, sorry.' })

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