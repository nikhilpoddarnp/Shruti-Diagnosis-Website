const Appointment = require('../model/Appointment'); 
const Status = require('../constant/StatusConstant');

class AppointmentDAO{

    async createAppointment(appointment){
        try {
            const savedAppointment = await appointment.save();
            return savedAppointment;
        } catch (error) {
          throw new Error('Error creating appointment: ' + error.message);
        }
    }

    async getAppointmentById(id){
        try {
            var appointment = await Appointment.findOne({'id': id}).exec();
            if(!appointment){
                throw new Error('Appointment not found');
            }
            return appointment;
        } catch (error) {
          throw new Error('Error while fetching appointment: ' + error.message);
        }
    }

    async updateAppointment(appointment){
        try {
            const updatedAppointment = await appointment.save();
            return updatedAppointment;
        } catch (error) {
          throw new Error('Error updating appointment: ' + error.message);
        }
    }

    async getAllAppointmentForUser(userId){
        try {
            var appointments = await Appointment.find({'userId': userId}).exec();
            appointments.sort((a1, a2) => a2.appointmentDTM - a1.appointmentDTM);
            return appointments;
        } catch (error) {
          throw new Error('Error while fetching appointment: ' + error.message);
        }
    }

    async getAllAppointmentForAdmin(){
        try {
            var appointments = await Appointment.find().exec();
            appointments.sort((a1, a2) => a2.appointmentDTM - a1.appointmentDTM);
            return appointments;
        } catch (error) {
          throw new Error('Error while fetching appointment:' + error.message);
        }
    }

    async deleteAppointmentForUser(userId){
        try {
            var result = await Appointment.deleteMany({'userId': userId}).exec();
            return result;
        } catch (error) {
          throw new Error('Error while fetching appointment: ' + error.message);
        }
    }

}


module.exports = AppointmentDAO;