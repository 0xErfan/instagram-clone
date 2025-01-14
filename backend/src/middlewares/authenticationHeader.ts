const { IncomingMessage, ServerResponse } = require('http')
const { decryptToken, sendResponse } = require('../utils')
const { userModel } = require('../models/User')

const authTokenChecker = async (req: typeof IncomingMessage, res: typeof ServerResponse): Promise<boolean> => {

    try {

        const authHeader = req.headers['authorization'];
        const token = authHeader?.split(' ')[1];

        if (!token) {
            sendResponse(res, 403, { message: 'Access Denied: No Token Provided' });
            return false;
        }

        const decoded = await decryptToken(token);
        const { _id } = decoded || {};

        if (!_id) {
            sendResponse(res, 403, { message: 'Access Denied: Invalid Token' });
            return false;
        }

        const user = await userModel.findOne({ _id });

        if (!user) {
            sendResponse(res, 403, { message: 'Access Denied: User Not Found' });
            return false;
        }

        // here we're just attaching user data to the request for downstream use
        (req as any).user = user;
        return true;

    } catch (error) {
        console.error('Error in authTokenChecker:', error);
        sendResponse(res, 500, { message: error?.toString() });
        return false;
    }
};



module.exports = authTokenChecker