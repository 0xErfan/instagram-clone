const { IncomingMessage, ServerResponse } = require('http')
const { decryptToken, sendResponse } = require('../utils')
const { UserModel } = require('../models/User')

const authTokenChecker = async (req: typeof IncomingMessage, res: typeof ServerResponse): Promise<boolean> => {

    try {

        if (!req.headers['authorization']) {
            sendResponse(res, 403, {
                message: 'Access Denied: No Authorization Header Provided',
                details: 'Please provide a valid Bearer token'
            });
            return false;
        }

        const authHeader = req.headers['authorization'];
        const [bearer, token] = authHeader.split(' ');

        if (!token || bearer.toLowerCase() !== 'bearer') {
            sendResponse(res, 401, {
                message: 'Invalid Authorization Header',
                details: 'Expected format: Bearer <token>'
            });
            return false;
        }

        if (!isValidTokenStructure(token)) {
            sendResponse(res, 400, {
                message: 'Invalid Token Structure',
                details: 'Token must contain header, payload, and signature'
            });
            return false;
        }

        const decoded = await decryptToken(token);

        if (!decoded || !decoded._id || !decoded.exp) {
            sendResponse(res, 403, {
                message: 'Access Denied: Invalid Token Contents',
                details: 'Token missing required fields'
            });
            return false;
        }

        if (Date.now() > decoded.exp * 1000) {
            sendResponse(res, 401, {
                message: 'Access Denied: Token Expired',
                details: 'Please obtain a fresh token'
            });
            return false;
        }

        const user = await UserModel.findOne({ _id: decoded._id });

        if (!user) {
            sendResponse(res, 403, {
                message: 'Access Denied: User Not Found',
                details: 'User associated with token does not exist'
            });
            return false;
        }

        (req as any).user = user;
        return true;

    } catch (error: any) {

        console.error('Authentication Error:', error);

        if (error.name === 'TokenExpiredError') {
            sendResponse(res, 401, {
                message: 'Access Denied: Token Expired',
                details: 'Please obtain a fresh token'
            });
        } else {
            console.log(error)
            sendResponse(res, 500, {
                message: 'Internal Server Error',
                details: 'Authentication failed unexpectedly'
            });
        }

        return false;
    }

};


const isValidTokenStructure = (token: string): boolean => {
    const parts = token.split('.');
    return parts.length === 3 &&
        parts.every(part => part.length > 0);
}

module.exports = authTokenChecker