const {check} = require('express-validator')
const User = require('../models/User')

exports.validateRegisterUser = [
    check('username')
        .notEmpty()
        .withMessage('Username is required'),
    check('email')
        .notEmpty()
        .withMessage('Email is required')
        .bail()
        .isEmail()
        .withMessage('Email must be email form')
        .bail()
        .custom(async (value) => {
            const user = await User.findOne({email: value})
            if (user) {
                return Promise.reject('Email already taken')
            }
        }),
    check('password')
        .notEmpty()
        .withMessage('Pasword is required'),
]

exports.validateLogin = [
    check('email')
        .notEmpty()
        .withMessage('Email is required')
        .bail()
        .isEmail()
        .withMessage('Email must be email form'),
    check('password')
        .notEmpty()
        .withMessage('Pasword is required'),
]