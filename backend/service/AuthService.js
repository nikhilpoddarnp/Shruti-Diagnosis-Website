const UserDAO = require('../dao/UserDAO');
const User = require('../model/Users'); 
const PasswordUtil = require('../util/PasswordUtil');
const PropertyUtil = require('../util/PropertyUtil')
const JwtUtil = require('../util/JwtUtil');

class AuthService {

    constructor(){
        global.userDAO = new UserDAO();
    }
    async login(loginData){
        const user = new User(loginData);
        if(PropertyUtil.isEmpty(user.email) || PropertyUtil.isEmpty(user.password)){
            throw new Error('Email or Password is not valid');
        }
        const userDB = await global.userDAO.getUserByEmail(user.email);
        if(!PasswordUtil.matchPassword(user.password, userDB.password)){
            throw new Error('Email or Password is not valid');
        }
        return JwtUtil.generateJwt(userDB);
    }
}



module.exports = AuthService;