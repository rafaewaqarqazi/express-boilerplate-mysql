const { DataTypes, Model } = require('sequelize')
const sequelize = require('../config/db')
const uuidv1 = require('uuid/v1');
const crypto = require('crypto');
const hooks = {
    beforeCreate(user) {
        user.salt = uuidv1()
        user.password = encryptPassword(user);
    }
}
const authenticate = (user, password) => {
    return encryptPassword(user) === password;
}
const encryptPassword = (user) => {
    if (!user.password)
        return "";
    try {
        return crypto.createHmac('sha1', user.salt)
            .update(user.password)
            .digest('hex');
    }
    catch (err) {
        return "";
    }
}
class Users extends Model {}
Users.init({
    username: DataTypes.STRING,
    email: {
        type: DataTypes.STRING,
        unique: true
    },
    salt: DataTypes.STRING,
    password: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
}, { hooks, modelName: 'users', sequelize })


module.exports = {Users, authenticate}

