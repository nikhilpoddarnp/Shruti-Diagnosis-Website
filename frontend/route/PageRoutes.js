const express = require('express');
const PageController = require('../controller/PageController'); 

const pageRouters = express.Router(); 

pageRouters.get('', PageController.homePage)


module.exports = pageRouters;