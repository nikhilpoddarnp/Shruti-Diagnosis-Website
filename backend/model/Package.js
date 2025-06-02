const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const packageSchema = new mongoose.Schema({
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
    image: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ''
    },
    price: {
        type: Number,
        required: false
    },
    discount: {
        type: Number,
        required: false,
        default: 0
    },
    isActive: {
        type: Boolean,
        required: true,
        default: false
    },
    testIds: {
        type: [String],
        set: function(value) {
            return [...new Set(value)];
        },
        required: false,
        default: []  
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    }
});

const Package = mongoose.model('Package', packageSchema);

module.exports = Package;
