const RequestCallDAO = require('../dao/RequestCallDAO');
const RequestCall = require('../model/RequestCall'); 
const PropertyUtil = require('../util/PropertyUtil');


class RequestCallService {

    constructor(){
        global.requetCallDAO = new RequestCallDAO();
    }

    async createRequestCall(data) {
        try {
            var requestCall = new RequestCall(data);
            requestCall = await global.requetCallDAO.createRequestCall(requestCall); 
            return requestCall; 
        } catch (error) {
          console.log(error.stack)
          throw new Error('Service Error: ' + error.message);
        }
    }
    
    async getAllRequestCalls() {
        try {
          const requestCalls = await global.requetCallDAO.getAllRequestCalls(); 
          return requestCalls;
        } catch (error) {
          throw new Error('Service Error: ' + error.message);
        }
    }

    async updateRequestCallById(id, updateData) {
        try {
            var requestCall = await global.requetCallDAO.getRequestCallById(id);
            
            PropertyUtil.copyProperties(updateData, requestCall);
            const updatedRequestCallData = new RequestCall(requestCall);
            
            var updatedRequestCall = await global.requetCallDAO.updateRequestCall(updatedRequestCallData);
            
            return updatedRequestCall;
        } catch (error) {
            console.log(error.stack)
            throw new Error('Service Error: ' + error.message);
        }
    }

    async getRequestCallById(id) {
        try {
            const requestCall = await global.requetCallDAO.getRequestCallById(id);
            return requestCall;
        } catch (error) {
            console.log(error.stack)
            throw new Error('Service Error: ' + error.message);
        }
    }

}

module.exports = RequestCallService;

