const Test = require('../model/Test'); 


class TestDAO {


    async createTest(TestData){
        try {
            const savedTest = await TestData.save();
            return savedTest;
        } catch (error) {
          throw new Error('Error creating test: ' + error.message);
        }
    }


    async getAllTests(){
        try {
            const tests = await Test.find().exec();
            return tests;
        } catch (error) {
          throw new Error('Error getting all test: ' + error.message);
        }
    }

    async getAllActiveTests(){
        try {
            const tests = await Test.find({'isActive': true}).exec();
            return tests;
        } catch (error) {
            throw new Error('Error creating package: ' + error.message);
        }
    }

    async getTestById(id){
        try {
            const test = await Test.findOne({'id': id}).exec();
            return test;
        } catch (error) {
            throw new Error('Error getting test by id: ' + error.message);
        }
    }

    async updateTest(TestData){
        try {
            const savedTest = await TestData.save();
            return savedTest;
        } catch (error) {
          throw new Error('Error updating test: ' + error.message);
        }
    }

    async deleteTestById(id){
        try {
            const results = await Test.deleteMany({'id': id}).exec();
            return results;
        } catch (error) {
            throw new Error('Error deleting test: ' + error.message);
        }
    }

    async getAllTestsBasedOnIds(ids){
        try {
            const tests = await Test.find({
                'id': {$in: ids}
            }).exec();
            return tests;
        } catch (error) {
          throw new Error('Error creating package: ' + error.message);
        }
    }

    async searchTests(searchData){
       
        try {
            const tests = await Test.find({
                'isActive': true,
                $or: [
                    {'title':  { $regex: searchData, $options: 'i' }},
                    {'description':  { $regex: searchData, $options: 'i' }}

                ]
            }).exec();
            return tests;
        } catch (error) {
          throw new Error('Error creating package: ' + error.message);
        }
    }
}

module.exports = TestDAO;