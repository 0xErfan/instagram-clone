import { IncomingMessage, ServerResponse } from "http";

const { isUrlSegmentEqual, notFoundRoute } = require("../../dist/utils.js")
const { banUser, createUser, findUser } = require('../controllers/userController.js')

const userRoute = (req: IncomingMessage, res: ServerResponse) => {

    const { url } = req

    if (isUrlSegmentEqual(url, 'ban', 2)) return banUser(req, res)
    if (isUrlSegmentEqual(url, 'create', 2)) return createUser(req, res)
    if (isUrlSegmentEqual(url, 'get', 2)) return findUser(req, res)

    notFoundRoute(res)
};

module.exports = userRoute;