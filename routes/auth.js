const express = require('express')
const User = require('../models/user')
const {signIn, signUp} = require('../controllers/auth.controller')
const router = express.Router()

router.post('/signup', signUp)
router.post('/signin', signIn)

module.exports = router