
class EncryptionUtil {

    static encrypt(value){
        const encrypted = Buffer.from(value, 'utf8').toString('base64');
        return encrypted;
    }

    static decrypt(value){
        const decrypted = Buffer.from(value, 'base64').toString('utf8');
        return decrypted;
    }
}

module.exports = EncryptionUtil;