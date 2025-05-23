const { config } = require('dotenv')
const mongoose = require("mongoose")

config()

const connectToDB = async () => {
    try {
        if (mongoose.connections[0].readyState) return true
        await mongoose.connect(process.env?.MONGODB_URI)
        // await fixUserIndexes()
        console.log('Connected to db successfully :)) ')
    } catch (err) { console.log('Failed to connect => ', err) }
}

module.exports = connectToDB;