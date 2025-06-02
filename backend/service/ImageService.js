
const ImageDAO = require('../dao/ImageDAO');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const os = require('os');

class ImageService {

    constructor(){
        global.imageDAO = new ImageDAO();
    }

    async saveImage(pageName, file) {
        try {
            const fileExtension = path.extname(file.originalname);
            const fileName = uuidv4() + fileExtension;
            let rootDir = await this.getRootDir();
            let replacePath = rootDir + "/images";
            const folderPath = replacePath + "/" + pageName;
           
            if(!fs.existsSync(folderPath)){
                fs.mkdirSync(folderPath, {recursive: true});
            }
            let filePath = folderPath + "/" + fileName;
            
            filePath = filePath.replace(/\\/g, '/');
            replacePath = replacePath.replace(/\\/g, '/');
            console.log(filePath);
            await global.imageDAO.save(filePath, file.buffer);

            filePath = filePath.replace(replacePath + "/", "");

            console.log(filePath);
            return filePath;
        } catch (error) {
            throw new Error('Error saving the image: ' + error.message);
        }
    }

    async getImagePath(pageName, fileName) {
        try {
            let rootDir = await this.getRootDir();
            const folderPath =  rootDir + "/images/" + pageName;
            let filePath = folderPath + "/" + fileName;
            filePath = filePath.replace(/\\/g, '/');
            console.log(filePath);
            return filePath;
        } catch (error) {
            throw new Error('Error retrieving image path: ' + error.message);
        }
    }

    async getRootDir(){
        const osName = os.type();
        console.log(osName);
        if(osName.toLowerCase().includes('win'.toLowerCase())){
            return "D:/";
        } else{
            return os.homedir();
        }
    }
}

module.exports = ImageService;
