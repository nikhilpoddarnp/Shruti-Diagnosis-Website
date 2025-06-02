const TestDAO = require('../dao/TestDAO');
const Test = require('../model/Test'); 
const PropertyUtil = require('../util/PropertyUtil');


class TestService {

    constructor(){
      global.testDAO = new TestDAO();
    }

    async createTest(userId, data) {
        try {
            var testData = new Test(data);
            testData.createdById = userId;
            testData = await global.testDAO.createTest(testData); 
            return testData; 
        } catch (error) {
          console.log(error.stack)
          throw new Error('Service Error: ' + error.message);
        }
    }
    
    async getAllTests() {
        try {
          const tests = await global.testDAO.getAllTests(); 
          return tests;
        } catch (error) {
          throw new Error('Service Error: ' + error.message);
        }
    }

    async getAllActiveTests() {
      try {
        const tests = await global.testDAO.getAllActiveTests(); 
        return tests;
      } catch (error) {
        throw new Error('Service Error: ' + error.message);
      }
    }

    async getTestById(id) {
      try {
        const test = await global.testDAO.getTestById(id); 
        return test;
      } catch (error) {
        throw new Error('Service Error: ' + error.message);
      }
    }

    async updateTest(id, updateData) {
      try {
        var testData = await global.testDAO.getTestById(id); 
        PropertyUtil.copyProperties(updateData, testData);
        const updatedTestData = new Test(testData);
        testData = await global.testDAO.updateTest(updatedTestData);
        return testData;
      } catch (error) {
        console.log(error.stack);
        throw new Error('Service Error: ' + error.message);
      }
    }

    async deleteTestById(id) {
      try {
        const result = await global.testDAO.deleteTestById(id); 
        return result;
      } catch (error) {
        throw new Error('Service Error: ' + error.message);
      }
    }

    async getAllTestsBasedOnIds(ids) {
      try {
        if(ids === null || ids === undefined){
          return [];
        }
        const tests = await global.testDAO.getAllTestsBasedOnIds(ids); 
        return tests;
      } catch (error) {
        throw new Error('Service Error: ' + error.message);
      }
    }

    async searchTests(searchData){
      
        try {
            const tests = await global.testDAO.searchTests(searchData); 
            return tests;
        } catch (error) {
           throw new Error('Service Error: ' + error.message);
        }
    }

}

module.exports = TestService;