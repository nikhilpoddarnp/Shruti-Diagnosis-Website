const express = require('express');
const AuthController = require('../controller/AuthController'); 


const authRouters = express.Router();

const authController = new AuthController();

authRouters.post("/login", authController.login)

module.exports = authRouters;

