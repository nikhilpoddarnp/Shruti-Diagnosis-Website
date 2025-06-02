const express = require('express');
const RequestCallController = require('../controller/RequestCallController'); 

const requestCallRouters = express.Router();

const requestCallController = new RequestCallController();

requestCallRouters.post("/", requestCallController.createRequestCall)
requestCallRouters.get("/", requestCallController.getAllRequestCalls)
requestCallRouters.get("/:id", requestCallController.getRequestCallById)
requestCallRouters.put("/:id", requestCallController.updateRequestCallById)


module.exports = requestCallRouters;
