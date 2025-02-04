import { IncomingMessage, ServerResponse } from "http";
import { middleware } from "../utils";

const { hasPermission } = require('../middlewares/hasPermission')
const authTokenChecker = require('../middlewares/authenticationHeader')
const { isUrlSegmentEqual, notFoundRoute } = require("../utils")
const { banUser, deleteUser, unBanUser, updateUser } = require('../controllers/userController')

const userRoute = (req: IncomingMessage, res: ServerResponse) => {

  const { url } = req

  if (isUrlSegmentEqual(url, 'ban', 2)) return middleware(req, res, hasPermission(['admin', 'secretary']), banUser)
  if (isUrlSegmentEqual(url, 'unBan', 2)) return middleware(req, res, hasPermission(['admin', 'secretary']), unBanUser)
  if (isUrlSegmentEqual(url, 'delete', 2)) return middleware(req, res, hasPermission(['user', 'super_admin', 'self']), deleteUser)
  if (isUrlSegmentEqual(url, 'update', 2)) return middleware(req, res, authTokenChecker, updateUser)

  notFoundRoute(res)
};

module.exports = userRoute;
