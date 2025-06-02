const path = require('path');

class PageController{
    
    static homePage(req, res){
        res.sendFile(path.join(__dirname, '../html', 'index.html'));
    }
}

module.exports = PageController;


