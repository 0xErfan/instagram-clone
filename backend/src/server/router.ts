import { IncomingMessage, ServerResponse } from "http";

const userRoutes = require('../../src/routes/userRoutes')
const { notFoundRoute, isUrlSegmentEqual } = require('../../src/utils')

const router = (req: IncomingMessage, res: ServerResponse) => {

    const { url } = req;

    if (isUrlSegmentEqual(url, 'users')) return userRoutes(req, res);

    notFoundRoute(res)

};

module.exports = router;