import TokenManager from "../classes/TokenManager";

const { IncomingMessage, ServerResponse } = require('http')
const { sendResponse } = require('../utils')
const { UserModel } = require('../models/User')

const authTokenChecker = async (req: typeof IncomingMessage, res: typeof ServerResponse): Promise<boolean> => {

    try {

        const cookieHeader = req.headers.cookie;

        if (!cookieHeader) {
            sendResponse(res, 403, {
                errors: ['Access Denied: No Cookie Provided'],
                success: false
            });
            return false;
        }

        const tokenMatch = cookieHeader.match(/token=([^;]+)/);
        const token = tokenMatch?.[1]?.replace(/^"|"$/g, ''); // remove quotes if any

        if (!token) {
            sendResponse(res, 401, {
                errors: ['Access Denied: Token Missing in Cookie'],
                success: false
            });
            return false;
        }

        const { decryptToken } = TokenManager();

        const decoded = await decryptToken(token) as any;

        const user = await UserModel.findById(decoded._id);

        if (!user) {
            sendResponse(res, 403, {
                errors: ['Access Denied: User Not Found'],
                success: false
            });
            return false;
        }

        (req as any).user = user;
        return true;

    } catch (error: any) {

        console.error('Authentication Error:', error);

        if (error.name === 'TokenExpiredError') {
            sendResponse(res, 401, {
                errors: ['Access Denied: Token Expired'],
                success: false
            });
        } else {
            sendResponse(res, 500, {
                errors: ['Internal Server Error'],
                success: false
            });
        }

        return false;

    }
};

module.exports = authTokenChecker