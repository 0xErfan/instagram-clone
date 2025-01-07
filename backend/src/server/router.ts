import { IncomingMessage, ServerResponse } from "http";

const userRoutes = require('../routes/userRoutes')
const authRoutes = require('../routes/authRoutes')
const { notFoundRoute, isUrlSegmentEqual } = require('../utils')

const router = (req: IncomingMessage, res: ServerResponse) => {

    const { url } = req;

    if (isUrlSegmentEqual(url, 'users')) return userRoutes(req, res);
    if (isUrlSegmentEqual(url, 'auth')) return authRoutes(req, res);

    notFoundRoute(res)

};

module.exports = router;