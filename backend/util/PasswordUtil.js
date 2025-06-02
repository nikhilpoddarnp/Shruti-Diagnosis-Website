
class PasswordUtil {

    static encryptPassword(password){
        const encrypted = Buffer.from(password, 'utf8').toString('base64');
        return encrypted;
    }

    static matchPassword(enterPassword, encryptedPassword){
        const enterPasswordEncrypted = this.encryptPassword(enterPassword);
        return encryptedPassword === enterPasswordEncrypted;
    }

    static generatePassword(){
        let password = PasswordUtil.getCharPassword() + "@" + PasswordUtil.getNumberPassword();
        return password;
    }

    static getCharPassword(){
        const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        let CharPassword = '';
        for (let i = 0; i < 5; i++) {
            const randomIndex = Math.floor(Math.random() * charset.length);
            CharPassword += charset[randomIndex];
        }
        return CharPassword;
    }

    static getNumberPassword(){
        const charset = "0123456789";
        let numberPassword = '';
        for (let i = 0; i < 3; i++) {
            const randomIndex = Math.floor(Math.random() * charset.length);
            numberPassword += charset[randomIndex];
        }
        return numberPassword;
    }


}

module.exports = PasswordUtil;