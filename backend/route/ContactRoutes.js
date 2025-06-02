const express = require('express');
const ContactController = require('../controller/ContactController'); 


const contactRouters = express.Router();


contactRouters.get("/", ContactController.getContect)

module.exports = contactRouters;

