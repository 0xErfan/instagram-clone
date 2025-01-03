import connectToDb from '../configs/db.js'
import { getReqBody } from '../utils.js'
await connectToDb()

const createUser = async (req, res) => {

    try {
        const myData = await getReqBody(req)
        res.end(JSON.parse(JSON.stringify(myData)))
    } catch (error) { res.end(error.toString()), console.log(error) }

}

const getUsers = async (req, res) => {
    res.end('our users: []')
}

const banUser = async (req, res) => {
    res.end(`user ${id} got banned haha.`)
}

export {
    createUser, getUsers, banUser
}