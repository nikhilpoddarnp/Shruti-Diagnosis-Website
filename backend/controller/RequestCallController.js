const RequestCallService = require('../service/RequestCallService');

class RequestCallController {

    constructor(){
      global.requestCallService = new RequestCallService();
    }
    async createRequestCall(req, res) {
      
        const data = req.body; 
        try {
          const requestCallData = await global.requestCallService.createRequestCall(data); 
          res.status(201).json(requestCallData); 
        } catch (error) {
          console.log(error.stack);
          res.status(500).json({ message: error.message }); 
        }
    }

    async getAllRequestCalls(req, res) {

        try {
          const requestCalls = await global.requestCallService.getAllRequestCalls(); 
          res.status(201).json(requestCalls); 
        } catch (error) {
          console.log(error.stack);
          res.status(500).json({ message: error.message }); 
        }
    }

    async updateRequestCallById(req, res) {
      const { id } = req.params; 
      const updateData = req.body; 
      try {
        const updatedReqCall = await global.requestCallService.updateRequestCallById(id, updateData); 
        res.status(200).json(updatedReqCall); 
      } catch (error) {
        console.log(error.stack);
        res.status(404).json({ message: error.message });
      }
    }

    async getRequestCallById(req, res) {
      const { id } = req.params; 
      
      try {
        const reqCall = await global.requestCallService.getRequestCallById(id); 
        res.status(200).json(reqCall); 
      } catch (error) {
        console.log(error.stack);
        res.status(404).json({ message: error.message });
      }
    }
}


module.exports = RequestCallController;