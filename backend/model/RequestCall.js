const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');


const requestCallSchema = new mongoose.Schema({
    id: { 
        type: String, 
        default: () => uuidv4(), 
        unique: true, 
        required: true 
      },
    name: {
        type: String,
        required: true,
    },
    mobileNo: {
        type: Number,
        required: true
    },
    comment:{
        type: String,
        default: ''
    },
    status:{
        type: String,
        required: true,
        default: 'OPEN'
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    }
});

const RequestCall = mongoose.model('RequestCall', requestCallSchema);

module.exports = RequestCall;
