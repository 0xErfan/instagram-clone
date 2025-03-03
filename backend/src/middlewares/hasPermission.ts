const { IncomingMessage, ServerResponse } = require('http')
const { sendResponse } = require('../utils')
import TokenManager from '../classes/TokenManager';
import { UserModel } from '../models/User'

const hasPermission = (roles: string[]) => {

    return async (req: typeof IncomingMessage, res: typeof ServerResponse): Promise<boolean> => {

        try {

            const authHeader = req.headers['authorization'];
            const token = authHeader?.split(' ')[1];

            if (!token) {
                sendResponse(res, 403, { errors: ['Access Denied: No Token Provided'], success: false });
                return false;
            }

            const { decryptToken } = TokenManager()

            const decoded = await decryptToken(token) as any;
            const { _id } = decoded || {};

            if (!_id) {
                sendResponse(res, 403, { errors: ['Access Denied: Invalid Token'], success: false });
                return false;
            }

            const user = await UserModel.findOne({ _id });

            if (!user) {
                sendResponse(res, 403, { errors: ['Access Denied: User Not Found'], success: false });
                return false;
            }

            if (
                roles.includes('self') // means the token owner him/her self have the permission.
                ||
                Array.isArray(user?.roles) && roles.some(role => user.roles.includes(role))
            ) {
                return true;
            } else {
                sendResponse(res, 403, { errors: ['Access Denied'], success: false });
                return false;
            }

        } catch (error) {
            console.error('Error in Permission checker:', error);
            sendResponse(res, 500, { errors: [error?.toString()], success: false });
            return false;
        }
    }

};

module.exports = { hasPermission }