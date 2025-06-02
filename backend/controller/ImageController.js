const ImageService = require('../service/ImageService');
const fs = require('fs');

class ImageController {

    constructor(){
        global.imageService = new ImageService();
    }

    async uploadImage(req, res) {
        try {
            const { pageName } = req.params;
            const file = req.file;
            if (!file) {
                return res.status(400).send({ message: 'No file uploaded.' });
            }
            const imagePath = await global.imageService.saveImage(pageName, file);
            return res.status(200).send({ imagePath: imagePath});
        } catch (error) {
            console.log(error.stack);
            return res.status(500).send({ message: error.message });
        }
    }

    async getImage(req, res) {
        try {
            const { pageName, fileName } = req.params;
            
            const filePath = await global.imageService.getImagePath(pageName, fileName);
            console.log(filePath);
            if (!fs.existsSync(filePath)) {
                return res.status(404).send({ message: 'Image not found.' });
            }

            return res.sendFile(filePath);
        } catch (error) {
            console.log(error.stack);
            return res.status(500).send({ message: error.message });
        }
    }
}

module.exports = ImageController;
