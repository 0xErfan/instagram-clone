import TokenManager from "../classes/TokenManager";

const { IncomingMessage, ServerResponse } = require('http')
const { sendResponse } = require('../utils')
const { UserModel } = require('../models/User')

const authTokenChecker = async (req: typeof IncomingMessage, res: typeof ServerResponse): Promise<boolean> => {

    try {

        if (!req.headers['authorization']) {
            sendResponse(res, 403, {
                errors: ['Access Denied: No Authorization Header Provided'],
                success: false
            });
            return false;
        }

        const authHeader = req.headers['authorization'];
        const [bearer, token] = authHeader.split(' ');

        if (!token || bearer.toLowerCase() !== 'bearer') {
            sendResponse(res, 401, {
                errors: ['Invalid Authorization Header'],
                success: false
            });
            return false;
        }

        const { decryptToken } = TokenManager()
        const decoded = await decryptToken(token) as any;

        const user = await UserModel.findOne({ _id: decoded._id });

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
            console.log(error)
            sendResponse(res, 500, {
                errors: ['Internal Server Error'],
                success: false
            });
        }

        return false;
    }

};

module.exports = authTokenChecker