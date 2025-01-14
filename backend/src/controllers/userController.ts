import { IncomingMessage, ServerResponse } from "http";

const { UserModel } = require('../models/User')
const { getReqBody, sendResponse } = require('../utils');

const banUser = async (req: IncomingMessage, res: ServerResponse) => {
    // role check middleware
    try {
        const userId = await getReqBody(req)
        const userData = await UserModel.findOne({ _id: userId })
        if (userData) {
            userData.isBan = true
            await userData.save()
            sendResponse(res, 200, { message: 'User banned successfully.' })
        } else {
            sendResponse(res, 404, { message: 'User not found.' })
        }
    } catch (error) {
        console.log(error)
        sendResponse(res, 500, error)
    }
}

module.exports = {
    banUser
}