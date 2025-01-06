const userRoutes = require('../routes/userRoutes.js')
const { notFoundRoute, isUrlSegmentEqual } = require('../../dist/utils.js')

const router = (req, res) => {

    const { url } = req;

    if (isUrlSegmentEqual(url, 'users')) return userRoutes(req, res);
    // if (isUrlSegmentEqual(url, 'auth')) return authRoutes(req, res);

    notFoundRoute(res)

};

module.exports = router;