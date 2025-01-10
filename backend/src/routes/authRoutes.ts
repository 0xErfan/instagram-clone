import { IncomingMessage, ServerResponse } from "http";
import { isUrlSegmentEqual, notFoundRoute, middleware } from "../utils";
const authTokenChecker = require('../middlewares/authenticationHeader')

const { logIn, signUp, getMe, logOut } = require('../controllers/authControllers')

const authRoutes = (req: IncomingMessage, res: ServerResponse) => {

    const { url } = req

    if (isUrlSegmentEqual(url!, 'login', 2)) return logIn(req, res);
    if (isUrlSegmentEqual(url!, 'signup', 2)) return signUp(req, res);
    if (isUrlSegmentEqual(url!, 'logout', 2)) return logOut(req, res);
    if (isUrlSegmentEqual(url!, 'getMe', 2)) return middleware(req, res, authTokenChecker, getMe);

    notFoundRoute(res)

}

module.exports = authRoutes