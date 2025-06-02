const PackageDAO = require('../dao/PackageDAO');
const Package = require('../model/Package'); 
const PropertyUtil = require('../util/PropertyUtil');


class PackageService {

    constructor(){
      global.packageDAO = new PackageDAO();    
    }


    async createPackage(userId, data) {
        try {
            var packageData = new Package(data);
            packageData.createdById = userId;
            packageData = await global.packageDAO.createPackage(packageData); 
            return packageData; 
        } catch (error) {
          console.log(error.stack)
          throw new Error('Service Error: ' + error.message);
        }
    }
    
    async getAllPackages() {
        try {
          const packages = await global.packageDAO.getAllPackages(); 
          return packages;
        } catch (error) {
          throw new Error('Service Error: ' + error.message);
        }
    }

    async getAllActivePackages() {
      try {
        const packages = await global.packageDAO.getAllActivePackages(); 
        return packages;
      } catch (error) {
        throw new Error('Service Error: ' + error.message);
      }
    }

    async getPackageById(id) {
        try {
          const packageData = await global.packageDAO.getPackageById(id); 
          return packageData;
        } catch (error) {
          throw new Error('Service Error: ' + error.message);
        }
    }

    async updatePackage(id, updateData) {
      try {
        var packageData = await global.packageDAO.getPackageById(id); 
        PropertyUtil.copyProperties(updateData, packageData);
        const updatedPackageData = new Package(packageData);
        packageData = await global.packageDAO.updatePackage(updatedPackageData);
        return packageData;
      } catch (error) {
        throw new Error('Service Error: ' + error.message);
      }
    }

    async deleteById(id) {
      try {
        const result = await global.packageDAO.deleteById(id); 
        return result;
      } catch (error) {
        throw new Error('Service Error: ' + error.message);
      }
    }

    async addTestToPackage(id, testId){
      try {
        var packageData = await global.packageDAO.getPackageById(id); 
      
        let testIds = packageData.testIds;
        if(testIds === null || testIds === undefined){
          testIds = [];
        }
        testIds.push(testId);
        packageData.testIds = testIds;
        packageData = await global.packageDAO.updatePackage(packageData);
        return packageData;
      } catch (error) {
        throw new Error('Service Error: ' + error.message);
      }
    }

    async removeTestFromPackage(id, testId){
      try {
        var packageData = await global.packageDAO.getPackageById(id); 
        let testIds = packageData.testIds;
        if(testIds === null || testIds === undefined){
          testIds = [];
        }
        let updatedTestIds = testIds.filter(item => item !== testId);  
        packageData.testIds = updatedTestIds;
        packageData = await global.packageDAO.updatePackage(packageData);
        return packageData;
      } catch (error) {
        throw new Error('Service Error: ' + error.message);
      }
    }

}

module.exports = PackageService;