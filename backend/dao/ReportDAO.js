const fs = require('fs');

class ReportDAO {

  async save(filePath, fileBuffer) {
    try {
      await fs.promises.writeFile(filePath, fileBuffer);
    } catch (error) {
      throw new Error('Error writing the image file: ' + error.message);
    }
  }
  
}

module.exports = ReportDAO;
