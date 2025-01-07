import { IncomingMessage, ServerResponse } from "http";

const connectToDb = require('../configs/db')
const userModel = require('../models/User')
const { getReqBody, sendResponse } = require('../utils');

(
    async () => {
        await connectToDb()
    }
)();

const createUser = async (req: IncomingMessage, res: ServerResponse) => {

    if (req.method !== 'POST') return sendResponse(res, 400, 'Method not acceptable buddy.')

    try {
        const userData = await getReqBody(req)
        await userModel.create(userData)
        sendResponse(res, 201, { message: 'Work done btw.' })
    } catch (error) {
        //@ts-expect-error
        if (error?.errorResponse && error.errorResponse?.code === 11000) {
            return sendResponse(res, 400, 'a user exist with this credentials haha.')
        }
        sendResponse(res, 500, error)
    }

}

const findUser = async (req: IncomingMessage, res: ServerResponse) => {

    try {

        const { _id } = await getReqBody(req)

        if (_id && _id.toString().trim().length !== 24) {
            sendResponse(res, 400, 'No user found here')
            return
        }

        const user = await userModel.findOne({ _id: _id.toString() })

        if (!user) sendResponse(res, 404, 'no user found with this id')
        sendResponse(res, 200, user)

    } catch (error) {
        console.log(error)
        sendResponse(res, 500, error)
    }
}

const banUser = async (req: IncomingMessage, res: ServerResponse) => {
    res.end(`user ${2} got banned haha.`)
}

module.exports = {
    createUser, findUser, banUser
}