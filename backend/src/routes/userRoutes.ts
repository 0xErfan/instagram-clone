import { IncomingMessage, ServerResponse } from "http";

const { isUrlSegmentEqual, notFoundRoute } = require("../../src/utils")
const { banUser, createUser, findUser } = require('../controllers/userController')

const userRoute = (req: IncomingMessage, res: ServerResponse) => {

    const { url } = req

    console.log(createUser)
    if (isUrlSegmentEqual(url, 'ban', 2)) return banUser(req, res)
    if (isUrlSegmentEqual(url, 'create', 2)) return createUser(req, res)
    if (isUrlSegmentEqual(url, 'get', 2)) return findUser(req, res)

    notFoundRoute(res)
};

module.exports = userRoute;