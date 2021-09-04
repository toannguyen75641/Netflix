const router = require('express').Router();
const {register, login} = require('../controllers/AuthController');
const {validateRegisterUser, validateLogin} = require('../request/AuthRequest')

router.post('/register', validateRegisterUser, register)

router.post('/login', validateLogin, login)

module.exports = router;