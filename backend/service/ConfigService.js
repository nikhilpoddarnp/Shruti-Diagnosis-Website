const ConfigDAO = require('../dao/ConfigDAO');
const Config = require('../model/Config'); 
const EncryptionUtil = require('../util/EncryptionUtil');


class ConfigService{

    constructor(){
        global.configDAO = new ConfigDAO();
      
    }

    async createConfig(configData){
        const config = new Config(configData);
        const savedConfig = await global.configDAO.createConfig(config);
        return savedConfig;
    }

    async createConfigEncrypted(configData){
        const config = new Config(configData);
        const encryptedValue = EncryptionUtil.encrypt(config.value);
        config.value = encryptedValue;
        config.encrypted = true;
        const savedConfig = await global.configDAO.createConfig(config);
        return savedConfig;
    }

   
    async getAllConfig(){
        const configs = await global.configDAO.getAllConfig();
        return configs;
    }

    async getConfigValueAt(id, defaultValue){
        const config = await global.configDAO.getConfigById(id);
        if(!config){
            return defaultValue;
        }
        if(config.encrypted){
            return EncryptionUtil.decrypt(config.value);
        }
        return config.value;
    }

    async deleteConfigById(id){
        await global.configDAO.deleteConfigById(id);
    }
}


module.exports = ConfigService;

