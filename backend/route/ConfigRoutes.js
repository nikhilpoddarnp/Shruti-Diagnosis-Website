const express = require('express');
const ConfigController = require('../controller/ConfigController'); 


const configRouters = express.Router();

const configController = new ConfigController();


configRouters.post("/", configController.createConfig)
configRouters.post("/encrypted", configController.createConfigEncrypted)
configRouters.get("/", configController.getAllConfig)
configRouters.delete("/:id", configController.deleteConfigById)


module.exports = configRouters;

