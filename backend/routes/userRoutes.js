import { isUrlSegmentEqual, notFoundRoute } from "../utils.js";
import { banUser, createUser, findUser } from '../controllers/userController.js'

const userRoute = (req, res) => {

    const { url } = req

    if (isUrlSegmentEqual(url, 'ban', 2)) return banUser(req, res)
    if (isUrlSegmentEqual(url, 'create', 2)) return createUser(req, res)
    if (isUrlSegmentEqual(url, 'get', 2)) return findUser(req, res)

    notFoundRoute(res)
};

export default userRoute;