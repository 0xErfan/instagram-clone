import { IncomingMessage, ServerResponse } from "http";
import { middleware } from "../utils";
const { hasPermission } = require('../middlewares/hasPermission')

const { isUrlSegmentEqual, notFoundRoute } = require("../utils")
const { banUser, createUser, deleteUser, unBanUser } = require('../controllers/userController')

const userRoute = (req: IncomingMessage, res: ServerResponse) => {

    const { url } = req

    if (isUrlSegmentEqual(url, 'ban', 2)) return middleware(req, res, hasPermission(['admin', 'secretary']), banUser)
    if (isUrlSegmentEqual(url, 'unBan', 2)) return middleware(req, res, hasPermission(['admin', 'secretary']), unBanUser)
    if (isUrlSegmentEqual(url, 'delete', 2)) return middleware(req, res, hasPermission(['user', 'super_admin', 'self']), deleteUser)
    if (isUrlSegmentEqual(url, 'create', 2)) return createUser(req, res)

    notFoundRoute(res)
};

module.exports = userRoute;