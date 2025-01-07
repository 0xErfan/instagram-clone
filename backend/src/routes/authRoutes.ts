import { IncomingMessage, ServerResponse } from "http";
import { isUrlSegmentEqual, notFoundRoute } from "../utils";

const { login, signUp } = require('../controllers/authControllers')

const authRoutes = (req: IncomingMessage, res: ServerResponse) => {

    const { url } = req

    if (isUrlSegmentEqual(url!, 'login', 2)) return login(req, res)
    if (isUrlSegmentEqual(url!, 'signup', 2)) return signUp(req, res)

    notFoundRoute(res)

}

module.exports = authRoutes