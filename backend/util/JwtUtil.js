const jwt = require('jsonwebtoken');


class JwtUtil {
    static SECRET_KEY = "shjahfafhdxzghdsghdsgasfgjfsdakdsvacvcagdsvcsgdfgjfdKFDDADAJDShsdggfaafjfgsd";

    static generateJwt(user){
        try{
            const payload = {
                userId: user.id,
                role: user.role,
                email: user.email
            };
    
            const options = {
                expiresIn: '1h'
            };
            const token = jwt.sign(payload, JwtUtil.SECRET_KEY, options);
            return token;
        } catch(error){
            console.log(error.stack)
            throw new Error("Unable to generate token ", error.messsage)
        }
    }

    static getPayload(token){
        try{
            const payload = jwt.verify(token, JwtUtil.SECRET_KEY);
            return payload;
        } catch(error){
            throw new Error("Token is not valid ", error.messsage)
        }
    }

    static getRoleFromPayload(token){
        const payload = JwtUtil.getPayload(token);
        return payload.role;
    }

    static getUserIdFromPayload(token){
        const payload = JwtUtil.getPayload(token);
        return payload.userId;
    }
}


module.exports = JwtUtil;