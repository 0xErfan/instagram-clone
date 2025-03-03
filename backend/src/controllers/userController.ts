import { IncomingMessage, ServerResponse } from "http";

const { UserModel } = require('../models/User')
const { getReqBody, sendResponse, extractValueFromSegment } = require('../utils');

const banUser = async (req: IncomingMessage, res: ServerResponse) => {
    // role check middleware
    try {

        const _id = extractValueFromSegment(req.url, 3)
        if (!_id) return sendResponse(res, 403, { errors: ["No _id provided"], success: false });

        const userData = await UserModel.findOne({ _id })

        if (userData) {
            userData.isBan = true
            await userData.save()
            sendResponse(res, 200, { message: 'User banned successfully.', success: true })
        } else sendResponse(res, 404, { errors: ['User not found.'], success: false })

    } catch (error) {
        console.log(error)
        sendResponse(res, 500, { errors: [error], success: false })
    }
}

const unBanUser = async (req: IncomingMessage, res: ServerResponse) => {
    // role check middleware
    try {

        const _id = extractValueFromSegment(req.url, 3)
        if (!_id) return sendResponse(res, 403, { errors: ["No _id provided"], success: false });

        const userData = await UserModel.findOne({ _id })

        if (userData) {
            userData.isBan = false
            await userData.save()
            sendResponse(res, 200, { message: 'User unbanned successfully.', success: true })
        } else sendResponse(res, 404, { message: 'User not found.' })

    } catch (error) {
        console.log(error)
        sendResponse(res, 500, { errors: [error], success: false })
    }
}

const deleteUser = async (req: IncomingMessage, res: ServerResponse) => {

    if (req.method !== 'DELETE') {
        sendResponse(res, 403, { errors: ["Method not allowed"], success: false })
        return;
    }

    try {

        const _id = extractValueFromSegment(req.url, 3)
        if (!_id) return sendResponse(res, 403, { errors: ["No _id provided"], success: false });

        const deleteUser = await UserModel.findOneAndDelete({ _id })

        if (deleteUser) {
            sendResponse(res, 200, { message: `User account deleted successfully`, success: true })
        } else sendResponse(res, 403, { errors: ["User not found"], success: false })

    } catch (error) {
        console.log(`deleteUser Error: ${error}`);
        sendResponse(res, 500, { errors: [error!.toString()], success: false })
    }
}

const updateUser = async (req: IncomingMessage, res: ServerResponse) => {

    if (req.method !== 'PUT') {
        sendResponse(res, 403, { errors: ["Method not allowed."], success: false })
        return;
    }

    try {

        const _id = (req as any).user?._id
        const userData = await getReqBody(req)

        const updatedUserData = await UserModel.findOneAndUpdate({ _id }, { ...userData })
        sendResponse(res, 200, { message: 'User data updated successfully.', data: { user: updatedUserData }, success: true })

    } catch (error) {
        console.log(`Internal error: ${error}`)
        sendResponse(res, 500, { errors: [`Internal Server Error: ${error}`], success: false })
    }
}

module.exports = {
    banUser,
    deleteUser,
    unBanUser,
    updateUser,

}