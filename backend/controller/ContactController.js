
class ContactController {

    static async getContect(req, res){
        try{
            let response = {
                "phone": 8888888888,
                "email": "shruti.diagnosis@gmail.com",
                "address": "7th cross 5th main Bazar Samiti Patna-800005"
            }
            res.status(200).json(response);
        } catch(error){
            res.status(401).json({ message: error.message }); 
        }
    }
}

module.exports = ContactController;

