const express = require('express');
const multer = require('multer');
const AppointmentController = require('../controller/AppointmentController'); 


const appointmentRouters = express.Router();

const storage = multer.memoryStorage(); 
const upload = multer({ storage: storage });

const appointmentController = new AppointmentController();


appointmentRouters.post("/:userId", appointmentController.createAppointment)
appointmentRouters.put("/:id/upload-report", upload.single('file'), appointmentController.updateReport)
appointmentRouters.put("/:id", appointmentController.updateAppointment)
appointmentRouters.get("/", appointmentController.getAllAppointment)
appointmentRouters.get("/:reportFileName/download-report", appointmentController.downloadReport)
appointmentRouters.get("/users/:userId", appointmentController.getAllAppointmentForUser)
appointmentRouters.delete("/:id/delete-report", appointmentController.deleteReport)


module.exports = appointmentRouters;

