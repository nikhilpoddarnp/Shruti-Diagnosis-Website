const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const contactSchema = new mongoose.Schema({
    id: { 
        type: String, 
        default: () => uuidv4(), 
        unique: true, 
        required: true 
      },
    createdById: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    address: {
        type: String,
        default: ''
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    }
});

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;
