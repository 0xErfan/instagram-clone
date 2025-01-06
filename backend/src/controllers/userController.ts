const connectToDb = require('../configs/db.js')
const userModel = require('../models/User.js')
const { getReqBody, sendResponse } = require('../../dist/utils.js');

(
    async () => {
        await connectToDb()
    }
)();

const createUser = async (req, res) => {

    if (req.method !== 'POST') return sendResponse(res, 400, 'Method not acceptable buddy.')

    try {
        const userData = await getReqBody(req)
        await userModel.create(userData)
        sendResponse(res, 201, { message: 'Work done btw.' })
    } catch (error) {
        sendResponse(res, 500, error)
    }

}

const findUser = async (req, res) => {
    try {

        const { _id } = await getReqBody(req)
        const user = await userModel.findOne({ _id: _id.toString() })

        if (!user) sendResponse(res, 404, 'no user found with this id')
        sendResponse(res, 200, user)

    } catch (error) {
        sendResponse(res, 500, error)
    }
}

const banUser = async (req, res) => {
    res.end(`user ${2} got banned haha.`)
}

module.exports = {
    createUser, findUser, banUser
}