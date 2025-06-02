const mongoose = require('mongoose');

const ConfigSchema = new mongoose.Schema({

    id: { 
        type: String, 
        unique: true, 
        required: true 
    },
    value:{
        type: String, 
        unique: true, 
        required: true 
    },
    encrypted:{
        type: Boolean,
        default: false, 
        required: true
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    }
});

const Config = mongoose.model('Config', ConfigSchema);

module.exports = Config;
