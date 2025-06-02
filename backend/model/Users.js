const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const userSchema = new mongoose.Schema({
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
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true
    },
    mobileNo: {
        type: Number,
        required: true
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    }
});

const Users = mongoose.model('Users', userSchema);

module.exports = Users;
