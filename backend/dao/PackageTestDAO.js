const PackageTest = require('../model/PackageTest'); 


class PackageTestDAO {

    static async createPackageTest(packageTestData){
        try {
            const savedPackageTest = await packageTestData.save();
            return savedPackageTest;
        } catch (error) {
          throw new Error('Error creating package test: ' + error.message);
        }
    }

    static async deletePackageTest(packageId, testId){
        try {
            const result = await PackageTest.deleteMany({
                'packageId': packageId,
                'testId': testId
            });
            return result;
        } catch (error) {
          throw new Error('Error creating package test: ' + error.message);
        }
    }

}

module.exports = PackageTestDAO;