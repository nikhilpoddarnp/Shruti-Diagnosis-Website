const ConfigService = require('../service/ConfigService'); 

class ConfigController {

    constructor(){
      global.configService = new ConfigService();
    }

    async createConfig(req, res) {
        const data = req.body; 
        try {
          const config = await global.configService.createConfig(data); 
          res.status(201).json(config); 
        } catch (error) {
          console.log(error.stack);
          res.status(500).json({ message: error.message }); 
        }
    }

    async createConfigEncrypted(req, res) {
        const data = req.body; 
        try {
          const config = await global.configService.createConfigEncrypted(data); 
          res.status(201).json(config); 
        } catch (error) {
          console.log(error.stack);
          res.status(500).json({ message: error.message }); 
        }
    }


  async getAllConfig(req, res) {
     
        try {
          const configs = await global.configService.getAllConfig();
          res.status(200).json(configs); 
        } catch (error) {
          console.log(error.stack)
          res.status(400).json({ message: error.message }); 
        }
  }

  async deleteConfigById(req, res) {
      const { id } = req.params;
      try {
        const result = await global.configService.deleteConfigById(id); 
        res.status(200).json({"message": "deleted successfully"}); 
      } catch (error) {
        console.log(error.stack)
        res.status(400).json({ message: error.message }); 
      }
  }

  
}

module.exports = ConfigController;

