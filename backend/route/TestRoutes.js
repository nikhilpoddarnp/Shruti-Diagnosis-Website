const express = require('express');
const TestController = require('../controller/TestController'); 


const testRouters = express.Router();

const testController = new TestController();

testRouters.post("/:userId", testController.createTest)

testRouters.get("/", testController.getAllTests)
testRouters.get("/active", testController.getAllActiveTests)
testRouters.get("/search", testController.searchTests)

testRouters.get("/:id", testController.getTestById)

testRouters.put("/:id", testController.updateTest)

testRouters.delete("/:id", testController.deteletTestById)



module.exports = testRouters;