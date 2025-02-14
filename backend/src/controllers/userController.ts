import { IncomingMessage, ServerResponse } from "http";

const { UserModel } = require('../models/User')
const { getReqBody, sendResponse, extractValueFromSegment } = require('../utils');

const banUser = async (req: IncomingMessage, res: ServerResponse) => {
    // role check middleware
    try {

        const _id = extractValueFromSegment(req.url, 3)
        if (!_id) return sendResponse(res, 403, { message: "No _id provided" });

        const userData = await UserModel.findOne({ _id })

        if (userData) {
            userData.isBan = true
            await userData.save()
            sendResponse(res, 200, { message: 'User banned successfully.' })
        } else sendResponse(res, 404, { message: 'User not found.' })

    } catch (error) {
        console.log(error)
        sendResponse(res, 500, error)
    }
}

const unBanUser = async (req: IncomingMessage, res: ServerResponse) => {
    // role check middleware
    try {

        const _id = extractValueFromSegment(req.url, 3)
        if (!_id) return sendResponse(res, 403, { message: "No _id provided" });

        const userData = await UserModel.findOne({ _id })

        if (userData) {
            userData.isBan = false
            await userData.save()
            sendResponse(res, 200, { message: 'User unbanned successfully.' })
        } else sendResponse(res, 404, { message: 'User not found.' })

    } catch (error) {
        console.log(error)
        sendResponse(res, 500, error)
    }
}

const deleteUser = async (req: IncomingMessage, res: ServerResponse) => {

    if (req.method !== 'DELETE') return sendResponse(res, 403, { message: "Method not allowed" })

    try {

        const _id = extractValueFromSegment(req.url, 3)
        if (!_id) return sendResponse(res, 403, { message: "No _id provided" });

        const deleteUser = await UserModel.findOneAndDelete({ _id })

        if (deleteUser) {
            sendResponse(res, 200, { message: `User account deleted successfully` })
        } else sendResponse(res, 403, { message: "User not found" })

    } catch (error) {
        console.log(`deleteUser Error: ${error}`);
        sendResponse(res, 500, { message: error!.toString() })
    }
}

const updateUser = async (req: IncomingMessage, res: ServerResponse) => {

    if (req.method !== 'PUT') return sendResponse(res, 403, { message: "Method not allowed." })

    try {

        const _id = (req as any).user?._id
        const userData = await getReqBody(req)

        const updatedUserData = await UserModel.findOneAndUpdate({ _id }, { ...userData })
        sendResponse(res, 200, { message: 'User data updated successfully.', user: updatedUserData })

    } catch (error) {
        console.log(`Internal error: ${error}`)
        sendResponse(res, 500, { message: `Internal Server Error: ${error}` })
    }
}

module.exports = {
    banUser,
    deleteUser,
    unBanUser,
    updateUser,

}