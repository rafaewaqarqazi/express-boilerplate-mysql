const {authenticate, Users} = require('../models/user')
const jwt = require('jsonwebtoken')
const expressjwt = require('express-jwt')
require('dotenv').config()
exports.signUp = async (req, res) => {
    try {
        const {user} = req.body
        const exists = await Users.findOne({where: {email: user.email}})
        if (exists) return res.status(403).json({
            error: "User Already Exists"
        });
        const response = await Users.create(user)
        res.json({success: true, message: 'SignUp Successful'})
    } catch (e) {
        console.log('Error', e.message)
    }
}
exports.signIn = async (req, res) => {
    try {
        const {email, password} = req.body
        const user = await Users.findOne({where: {email}, raw: true})
        console.log(user)
        if (!user) return res.status(401).json({
            error: "User Does not exist"
        })
        const auth = authenticate({password, salt: user.salt}, user.password)
        if (!auth) {
            return res.status(401).json({
                error:"Email/Password does not match"
            })
        }
        const token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: '2 days'});
        res.json({token})
    }catch (e) {
        console.log('Error', e.message)
    }
}
exports.requireSignin = expressjwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'auth'
});