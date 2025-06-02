const RequestCall = require('../model/RequestCall'); 


class RequestCallDAO {

    async createRequestCall(requestCall){
        try {
            const savedRequestCall = await requestCall.save();
            return savedRequestCall;
        } catch (error) {
          throw new Error('Error creating package: ' + error.message);
        }
    }


    async getAllRequestCalls(status){
        try {
            const requestCalls = await RequestCall.find({'status': status}).exec();
            return requestCalls;
        } catch (error) {
          throw new Error('Error creating package: ' + error.message);
        }
    }

    async getAllRequestCalls(){
        try {
            const requestCalls = await RequestCall.find().exec();
            return requestCalls;
        } catch (error) {
          throw new Error('Error creating package: ' + error.message);
        }
    }

    async getRequestCallById(id) {
        try {
            const requestCall = await RequestCall.findOne({id: id}).exec();
            if (!requestCall) {
                throw new Error('Request call not found');
            }
            return requestCall;
        } catch (error) {
            throw new Error('Error fetching request call: ' + error.message);
        }
    }

    async updateRequestCall(updatedRequestCall) {
        try {
          const requestCall = await updatedRequestCall.save();
          
          if (!requestCall) {
            throw new Error('Request Call not found');
          }
       
          return requestCall;
        } catch (error) {
          throw new Error('Error updating request call: ' + error.message);
        }
      }

}

module.exports = RequestCallDAO;