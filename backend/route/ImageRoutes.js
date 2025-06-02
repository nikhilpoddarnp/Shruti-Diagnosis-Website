const express = require('express');
const multer = require('multer');
const ImageController = require('../controller/ImageController'); 


const imageRouters = express.Router(); 

const storage = multer.memoryStorage(); 
const upload = multer({ storage: storage });

const imageController = new ImageController();

imageRouters.post('/:pageName/upload', upload.single('image'), imageController.uploadImage);

imageRouters.get('/:pageName/:fileName', imageController.getImage);


module.exports = imageRouters;