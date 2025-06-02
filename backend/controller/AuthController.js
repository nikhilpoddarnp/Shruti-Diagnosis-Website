const AuthService = require('../service/AuthService'); 

class AuthController {

    constructor(){
        global.authService = new AuthService();
    }
    
    async login(req, res){
        try{
            const data = req.body;
           
            const token = await global.authService.login(data);
            res.status(200).json({ token: token});
        } catch(error){
            console.log(error.stack)
            res.status(401).json({ message: error.message }); 
        }
       
    }
}


module.exports = AuthController;