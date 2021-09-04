const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/User')
const {validationResult} = require('express-validator')
const {error, success} = require('./Controller')

exports.register = async (req, res) => {
    const validator = validationResult(req)
    if (!validator.isEmpty()) {
        return error(res, validator.errors, 422)
    }
        
    try {
        const {username, email, password} = req.body
        const newUser = await User.create({
            username: username,
            email: email,
            password: password
        })
        return success(res, newUser)
    } catch (err) {
        return error(res, err.message, 500)
    }
}

exports.login = async (req, res) => {
    const validator = validationResult(req)
    if (!validator.isEmpty()) {
        return error(res, validator.errors, 422)
    }

    try {
        const {email, password} = req.body
        const user = await User.findOne({email: email})
        if (!user) {
            return error(res, [
                {
                    value: email,
                    msg: "Email does not exist",
                    param: "email",
                    location: "body"
                }
            ], 400)
        }
        const match = await bcrypt.compare(password, user.password)
        if (match) {
            const token = jwt.sign({id: user.id}, process.env.SECRET_KEY, {
                expiresIn: process.env.TOKEN_LIFE
            })
            return success(res, {
                ...user._doc,
                token
            })
        }
        return error(res, [
            {
                value: password,
                msg: "Incorrect password",
                param: "password",
                location: "body"
            }
        ], 400)
    } catch (err) {
        return error(res, err.message, 500)
    }
}