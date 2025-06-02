const express = require('express');
const EmailController = require('../controller/EmailController'); 


const emailRouters = express.Router();
const emailController = new EmailController();

emailRouters.get("/:email", emailController.sendEmail)

module.exports = emailRouters;

