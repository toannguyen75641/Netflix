const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    profilePic: {
        type: String,
        default: ""
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

UserSchema.pre('save', function(next) {
    let user = this

    bcrypt.hash(user.password, 10, function(err, hash) {
        if (err) {
            throw err
        }
        user.password = hash
        next()
    })
})

module.exports = mongoose.model('User', UserSchema)