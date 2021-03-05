const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        default: ''
    },
    updated: {
		type: Date,
		default: Date.now
	},
    created: {
        type: Date,
        default: Date.now
    }
})
const User = mongoose.model('User', UserSchema)
module.exports = User