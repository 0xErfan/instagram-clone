import { IncomingMessage, ServerResponse } from "http";
import { middleware } from "../utils";
const { hasPermission } = require('../middlewares/hasPermission')

const { isUrlSegmentEqual, notFoundRoute } = require("../utils")
const { banUser, createUser, findUser } = require('../controllers/userController')

const checkRole = (role: string | string[]) => hasPermission(role)

const userRoute = (req: IncomingMessage, res: ServerResponse) => {

    const { url } = req

    if (isUrlSegmentEqual(url, 'ban', 2)) return middleware(req, res, checkRole(['admin', 'secretary']), banUser)
    if (isUrlSegmentEqual(url, 'create', 2)) return createUser(req, res)
    if (isUrlSegmentEqual(url, 'get', 2)) return findUser(req, res)

    notFoundRoute(res)
};

module.exports = userRoute;