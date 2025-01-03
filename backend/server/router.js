import userRoutes from '../routes/userRoutes.js';
import authRoutes from '../routes/authRoutes.js'
import { notFoundRoute, isUrlSegmentEqual } from '../utils.js';

const router = (req, res) => {

    const { url } = req;

    if (isUrlSegmentEqual(url, 'users')) return userRoutes(req, res);
    if (isUrlSegmentEqual(url, 'auth')) return authRoutes(req, res);

    notFoundRoute(res)

};

export default router;