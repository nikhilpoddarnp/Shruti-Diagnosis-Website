const Config = require('../model/Config'); 

class ConfigDAO {

    async createConfig(config){
        try {
            const savedConfig = await config.save();
            return savedConfig;
        } catch (error) {
          throw new Error('Error creating appointment: ' + error.message);
        }
    }

    async getConfigById(id){
        try {
            var config = await Config.findOne({'id': id}).exec();
            
            return config;
        } catch (error) {
          throw new Error('Error while fetching config: ' + error.message);
        }
    }

    async getAllConfig(){
        try {
            var config = await Config.find().exec();
            return config;
        } catch (error) {
          throw new Error('Error while fetching config: ' + error.message);
        }
    }



    async deleteConfigById(id){
        try {
            var result = await Config.deleteMany({'id': id}).exec();
            return result;
        } catch (error) {
          throw new Error('Error while deleting appointment: ' + error.message);
        }
    }

}


module.exports = ConfigDAO;