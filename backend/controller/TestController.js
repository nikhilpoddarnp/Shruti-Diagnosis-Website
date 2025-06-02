const TestService = require('../service/TestService');

class TestController {

    constructor(){
      global.testService = new TestService();
    }

    async createTest(req, res) {
      
        const { userId } = req.params; 
        const data = req.body; 
        try {
          const testData = await global.testService.createTest(userId, data); 
          res.status(201).json(testData); 
        } catch (error) {
          console.log(error.stack);
          res.status(500).json({ message: error.message }); 
        }
    }

    async getAllTests(req, res) {
        try {
          const tests = await global.testService.getAllTests(); 
          res.status(200).json(tests); 
        } catch (error) {
          console.log(error.stack);
          res.status(500).json({ message: error.message }); 
        }
    }

    async getAllActiveTests(req, res) {
      try {
        const tests = await global.testService.getAllActiveTests(); 
        res.status(200).json(tests); 
      } catch (error) {
        console.log(error.stack);
        res.status(500).json({ message: error.message }); 
      }
    }

    async getTestById(req, res) {
      const { id } = req.params;
      try {
        const test = await global.testService.getTestById(id); 
        res.status(200).json(test); 
      } catch (error) {
        console.log(error.stack);
        res.status(500).json({ message: error.message }); 
      }
  }

  async updateTest(req, res){
      const { id } = req.params; 
      const data = req.body; 
      try{
        const testData = await global.testService.updateTest(id, data); 
        res.status(200).json(testData);
      } catch(error){
        console.log(error.stack);
        res.status(500).json({ message: error.message }); 
      }
  
  }

  async deteletTestById(req, res){
      const { id } = req.params; 
      try{
        const result = await global.testService.deleteTestById(id); 
        if(result.deletedCount === 0){
          res.status(404).json({ message: "No record present" });
        }
        res.status(200).json({ message: "Successfully deleted" });
      } catch(error){
        console.log(error.stack);
        res.status(500).json({ message: error.message }); 
      }
  
  }

  async searchTests(req, res){
      
      const { title } = req.query; 
      try {
        const tests = await global.testService.searchTests(title); 
        res.status(200).json(tests); 
      } catch(error){
        console.log(error.stack);
        res.status(500).json({ message: error.message }); 
      }
  }
}


module.exports = TestController;