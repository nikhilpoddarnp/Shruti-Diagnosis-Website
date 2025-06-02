const EmailService = require('../service/EmailService'); 

class EmailController {

    constructor(){
      global.emailService = new EmailService();
    }

    async sendEmail(req, res) {
        const { email } = req.params;
        try {
          const config = await global.emailService.sendGeneratedPasswordEmail(email); 
          res.status(201).json(config); 
        } catch (error) {
          console.log(error.stack);
          res.status(500).json({ message: error.message }); 
        }
    }
  
}

module.exports = EmailController;

