const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');


const appointmentSchema = new mongoose.Schema({
    id: { 
        type: String, 
        default: () => uuidv4(), 
        unique: true, 
        required: true 
      },
    userId: {
        type: String,
        required: true,
    },
    appointmentDTM: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ''
    },
    status: {
        type: String,
        required: true
    },
    reportUrl: {
        type: String,
        required: false
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    }
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
