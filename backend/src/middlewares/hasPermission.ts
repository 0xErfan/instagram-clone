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
                sendResponse(res, 403, { message: 'Access Denied: No Token Provided' });
                return false;
            }

            const { decryptToken } = new TokenManager()
            
            const decoded = await decryptToken(token) as any;
            const { _id } = decoded || {};

            if (!_id) {
                sendResponse(res, 403, { message: 'Access Denied: Invalid Token' });
                return false;
            }

            const user = await UserModel.findOne({ _id });

            if (!user) {
                sendResponse(res, 403, { message: 'Access Denied: User Not Found' });
                return false;
            }

            if (
                roles.includes('self') // means the token owner him/her self have the permission.
                ||
                Array.isArray(user?.roles) && roles.some(role => user.roles.includes(role))
            ) {
                return true;
            } else {
                sendResponse(res, 403, { message: 'Access Denied' });
                return false;
            }

        } catch (error) {
            console.error('Error in Permission checker:', error);
            sendResponse(res, 500, { message: error?.toString() });
            return false;
        }
    }

};

module.exports = { hasPermission }