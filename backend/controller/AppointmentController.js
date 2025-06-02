const AppointmentService = require('../service/AppointmentService'); 

class AppointmentController {

    constructor(){
      global.appointmentService = new AppointmentService();
    }

    async createAppointment(req, res) {
        const { userId } = req.params; 
        const data = req.body; 
        try {
          const appointment = await global.appointmentService.createAppointment(userId, data); 
          res.status(201).json(appointment); 
        } catch (error) {
          console.log(error.stack);
          res.status(500).json({ message: error.message }); 
        }
    }


    async updateAppointment(req, res) {
        const { id } = req.params; 
        const data = req.body; 
        try {
          const appointment = await global.appointmentService.updateAppointment(id, data); 
          res.status(200).json(appointment); 
        } catch (error) {
          console.log(error.stack);
          res.status(400).json({ message: error.message }); 
        }
    }

  async getAllAppointment(req, res) {
     
        try {
          const appointments = await global.appointmentService.getAllAppointmentForAdmin(); 
          res.status(200).json(appointments); 
        } catch (error) {
          console.log(error.stack)
          res.status(400).json({ message: error.message }); 
        }
  }

  async getAllAppointmentForUser(req, res) {
      const { userId } = req.params;
      try {
        const appointments = await global.appointmentService.getAllAppointmentForUser(userId); 
        res.status(200).json(appointments); 
      } catch (error) {
        console.log(error.stack)
        res.status(400).json({ message: error.message }); 
      }
  }

  async updateReport(req, res){
      const { id } = req.params;
      const file = req.file;
      try {
        const appointment = await global.appointmentService.updateReport(id, file);
        res.status(200).json(appointment); 
      } catch(error){
        console.log(error.stack)
        res.status(400).json({ message: error.message }); 
      }
  }

  async downloadReport(req, res){
    const { reportFileName } = req.params;
    
    try {
      const filePath = await global.appointmentService.getReportPath(reportFileName);
      res.setHeader('Content-Disposition', 'attachment; filename='+ reportFileName);
      res.setHeader('Content-Type', 'application/pdf');
      res.sendFile(filePath); 
    } catch(error){
      console.log(error.stack)
      res.status(400).json({ message: error.message }); 
    }
  }

  async deleteReport(req, res){
    const { id } = req.params;
    try{
      await global.appointmentService.deleteReport(id);
      res.status(400).json({ message: 'deleted successfully' }); 
    }catch(error){
      console.log(error.stack)
      res.status(400).json({ message: error.message }); 

    }
  }
  
}

module.exports = AppointmentController;

