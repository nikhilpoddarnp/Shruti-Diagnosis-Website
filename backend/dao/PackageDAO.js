const Package = require('../model/Package'); 


class PackageDAO {


    async createPackage(packageData){
        try {
            const savedPackage = await packageData.save();
            return savedPackage;
        } catch (error) {
          throw new Error('Error creating package: ' + error.message);
        }
    }


    async getAllPackages(){
        try {
            const packages = await Package.find().exec();
            return packages;
        } catch (error) {
          throw new Error('Error creating package: ' + error.message);
        }
    }

    async getAllActivePackages(){
        try {
            const packages = await Package.find({'isActive': true}).exec();
            return packages;
        } catch (error) {
          throw new Error('Error creating package: ' + error.message);
        }
    }

    async getPackageById(id){
        try {
            const packageData = await Package.findOne({'id': id}).exec();
            return packageData;
        } catch (error) {
          throw new Error('Error creating package: ' + error.message);
        }
    }

    async updatePackage(packageData){
        try {
            const savedPackage = await packageData.save();
            return savedPackage;
        } catch (error) {
          throw new Error('Error creating package: ' + error.message);
        }
    }

    async deleteById(id){
        try {
            const results = await Package.deleteMany({'id': id}).exec();
            return results;
        } catch (error) {
          throw new Error('Error creating package: ' + error.message);
        }
    }
}

module.exports = PackageDAO;