import { IncomingMessage, ServerResponse } from "http"
import { getReqBody, sendResponse, isAllKeysFilled, useCookie } from "../utils"

const UserModel = require('../models/User')

const login = async (req: IncomingMessage, res: ServerResponse) => {

    if (req.method !== 'POST') return sendResponse(res, 400, 'Not acceptable method')

    try {

        // TODO: add type safety
        const credentials = await getReqBody(req)
        const { phone, username } = credentials as any;

        const user_data = await UserModel.findOne({ $or: [{ phone }, { username }] })

        if (!user_data) sendResponse(res, 400, 'No user found, please signup.')

        sendResponse(res, 200, 'Gotta, here your token buddy')

    } catch (error) {
        sendResponse(res, 500, error!)
    }

}

const signUp = async (req: IncomingMessage, res: ServerResponse) => {

    if (req.method !== 'POST') return sendResponse(res, 404, 'Method not supported')

    try {

        const data = await getReqBody(req)

        if (!isAllKeysFilled(data!)) {
            sendResponse(res, 404, 'Please fill all needed data')
            return
        }

        const { phone, email, username } = data as any

        const isUserExist = await UserModel.findOne({ $or: [{ username }, { phone }] }) // or email

        if (isUserExist) {
            sendResponse(res, 404, `${phone || email || username} is taken by others`)
            return
        }

        const userData = await UserModel.create(data)
        const { set, delete: delCoolie, get } = useCookie(res, 201)

        delCoolie('token_4')
        res.end('done!')

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

module.exports = {
    login,
    signUp,
}