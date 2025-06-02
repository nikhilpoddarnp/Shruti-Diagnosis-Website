const nodemailer = require('nodemailer');
const ConfigService = require('../service/ConfigService'); 
const PasswordUtil = require('../util/PasswordUtil');
const EmailContentConstant = require('../constant/EmailContentConstant');
const UserService = require('../service/UserService');


class EmailService {

    constructor(){
        global.configService = new ConfigService();
        global.userService = new UserService();
    }

    async sendGeneratedPasswordEmail(email){
      console.log("email ::: ", email);
      const generatedPassword = PasswordUtil.generatePassword();
      await global.userService.updatePassword(email, generatedPassword);
      const content = EmailContentConstant.passwordResetBody.replace("{password}", generatedPassword);
      await this.sendEmail(email, EmailContentConstant.passwordResetSubject, content);
    }

    async sendEmail(to, subject, content){
        const fromEmail = await global.configService.getConfigValueAt('from.email.user', 'shrutidiasgnosis@gmail.com');
        const mailOptions = {
            from: fromEmail,    
            to: to,            
            subject: subject,        
            html: content       
        };
        
        try {
            const transporter = await this.getTransporter();
            const info = await transporter.sendMail(mailOptions);
            console.log('Email sent:', info.response);
        } catch (error) {
          console.error('Error sending email:', error);
        }
    }
    

    async getTransporter(){
        const userName = await global.configService.getConfigValueAt('from.email.user', 'shrutidiagnosis@gmail.com');
        const passweord = await global.configService.getConfigValueAt('from.email.password', 'xtes twsd xpac wdjd')
        const smtpConfig = {
            service: 'gmail',
            auth: {
              user: userName, 
              pass: passweord   
            }
          };
        const transporter = nodemailer.createTransport(smtpConfig);
        return transporter;
    } 
}

module.exports = EmailService;