const PackageService = require('../service/PackageService');
const TestService = require('../service/TestService');

class PackageController {

    constructor(){
      global.packageService = new PackageService();
      global.testService = new TestService();
    }

    async createPackage(req, res) {
      
        const { userId } = req.params; 
        const data = req.body; 
        try {
          const packageData = await global.packageService.createPackage(userId, data); 
          res.status(201).json(packageData); 
        } catch (error) {
          console.log(error.stack);
          res.status(500).json({ message: error.message }); 
        }
    }

    async getAllPackages(req, res) {

        try {
          const packages = await global.packageService.getAllPackages(); 
          res.status(200).json(packages); 
        } catch (error) {
          console.log(error.stack);
          res.status(500).json({ message: error.message }); 
        }
    }

    async getAllActivePackages(req, res) {

      try {
        const packages = await global.packageService.getAllActivePackages(); 
        res.status(200).json(packages); 
      } catch (error) {
        console.log(error.stack);
        res.status(500).json({ message: error.message }); 
      }
    }

    async getPackageById(req, res) {
      const { id } = req.params; 
      try {
        const packageData = await global.packageService.getPackageById(id); 
        let tests = []
        if(packageData && packageData.testIds){
          tests = await global.testService.getAllTestsBasedOnIds(packageData.testIds);
        }
        const response = {
          "packageData": packageData,
          "tests": tests
        };
        res.status(200).json(response); 
      } catch (error) {
        console.log(error.stack);
        res.status(500).json({ message: error.message }); 
      }
  }

  async updatePackage(req, res){
    const { id } = req.params; 
    const data = req.body; 
    try{
      const packageData = await global.packageService.updatePackage(id, data); 
      res.status(200).json(packageData);
    } catch(error){
      console.log(error.stack);
      res.status(500).json({ message: error.message }); 
    }

  }

  async deleteById(req, res){
    const { id } = req.params; 
    try{
      const result = await global.packageService.deleteById(id); 
      if(result.deletedCount === 0){
        res.status(404).json({ message: "No record present" });
      }
      res.status(200).json({ message: "Successfully deleted" });
    } catch(error){
      console.log(error.stack);
      res.status(500).json({ message: error.message }); 
    }
  }

  async addTestToPackage(req, res){
    const { id, testId } = req.params;  
    try{
      const packageData = await global.packageService.addTestToPackage(id, testId); 
      res.status(200).json(packageData);
    } catch(error){
      console.log(error.stack);
      res.status(500).json({ message: error.message }); 
    }

  }

  
  async removeTestFromPackage(req, res){
    const { id, testId } = req.params;  
    try{
      const packageData = await global.packageService.removeTestFromPackage(id, testId); 
      res.status(200).json(packageData);
    } catch(error){
      console.log(error.stack);
      res.status(500).json({ message: error.message }); 
    }

  }

}


module.exports = PackageController;