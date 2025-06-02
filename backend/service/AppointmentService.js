const AppointmentDAO = require('../dao/AppointmentDAO');
const ReportService = require('../service/ReportService');
const Appointment = require('../model/Appointment'); 
const PropertyUtil = require('../util/PropertyUtil');
const Status = require('../constant/StatusConstant');


class AppointmentService{

    constructor(){
        global.appointmentDAO = new AppointmentDAO();
        global.reportService = new ReportService();
    }

    async createAppointment(userId, appointmentData){
        const appointment = new Appointment(appointmentData);
        appointment.status = Status.OPEN;
        appointment.userId = userId;
        const savedAppointment = await global.appointmentDAO.createAppointment(appointment)
        return savedAppointment;
    }

    async updateAppointment(id, appointmentData){
        const appointmentDB = await global.appointmentDAO.getAppointmentById(id);
        PropertyUtil.copyProperties(appointmentData, appointmentDB);
        const updatedAppointmentData = new Appointment(appointmentDB);
        const updatedAppointment = await global.appointmentDAO.updateAppointment(updatedAppointmentData)
        return updatedAppointment;
    }

    async getAllAppointmentForAdmin(){
        
        const appointments = await global.appointmentDAO.getAllAppointmentForAdmin();
       
        return appointments;
    }

    async getAllAppointmentForUser(userId){
        const appointments = await global.appointmentDAO.getAllAppointmentForUser(userId);
        return appointments;
    }

    async deleteAppointForUser(userId){
        await global.appointmentDAO.deleteAppointForUser(userId);
    }

    async updateReport(id, file){
        const reportUri = await global.reportService.saveReport(file);
        const appointmentDB = await global.appointmentDAO.getAppointmentById(id);
        const updatedAppointmentData = new Appointment(appointmentDB);
        updatedAppointmentData.reportUrl = reportUri;
        const updatedAppointment = await global.appointmentDAO.updateAppointment(updatedAppointmentData);
        return updatedAppointment;
    }

    async getReportPath(reportFileName){
        const reportUri = await global.reportService.getReportPath(reportFileName);
        return reportUri;
    }

    async deleteReport(id){
        const appointmentDB = await global.appointmentDAO.getAppointmentById(id);
        const updatedAppointmentData = new Appointment(appointmentDB);
        const reportFileName = updatedAppointmentData.reportUrl;
        updatedAppointmentData.reportUrl = null;
        await global.reportService.deleteReport(reportFileName);
        const updatedAppointment = await global.appointmentDAO.updateAppointment(updatedAppointmentData);
        return updatedAppointment;
    }
}


module.exports = AppointmentService;

