
const ReportDAO = require('../dao/ReportDAO');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const os = require('os');

class ReportService {

    constructor(){
        global.reportDAO = new ReportDAO();
    }

    async saveReport(file) {
        try {
            
            const fileExtension = path.extname(file.originalname);
            const fileName = uuidv4() + fileExtension;
            let rootDir = await this.getRootDir();
            let replacePath = rootDir + "/reports";
            const folderPath = replacePath;
           
            if(!fs.existsSync(folderPath)){
                fs.mkdirSync(folderPath, {recursive: true});
            }

            let filePath = folderPath + "/" + fileName;
            
            filePath = filePath.replace(/\\/g, '/');
            replacePath = replacePath.replace(/\\/g, '/');
            console.log(filePath);

            await global.reportDAO.save(filePath, file.buffer);
            filePath = filePath.replace(replacePath + "/", "");
            console.log(filePath);

            return filePath;
        } catch (error) {
            throw new Error('Error saving the report: ' + error.message);
        }
    }

    async getReportPath(reportFileName) {
        try {
            let rootDir = await this.getRootDir();

            const folderPath =  rootDir + "/reports";
            let filePath = folderPath + "/" + reportFileName;
            filePath = filePath.replace(/\\/g, '/');
            console.log(filePath);

            return filePath;
        } catch (error) {
            throw new Error('Error retrieving report path: ' + error.message);
        }
    }

    async deleteReport(reportFileName){
        try {
            let rootDir = await this.getRootDir();

            const folderPath =  rootDir + "/reports";
            let filePath = folderPath + "/" + reportFileName;
            filePath = filePath.replace(/\\/g, '/');
            console.log(filePath);
            await fs.promises.unlink(filePath);
            return filePath;
        } catch (error) {
            throw new Error('Error retrieving report path: ' + error.message);
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

module.exports = ReportService;
