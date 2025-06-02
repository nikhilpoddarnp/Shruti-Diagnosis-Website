const UserDAO = require('../dao/UserDAO');
const PackageDAO = require('../dao/PackageDAO');
const User = require('../model/Users'); 
const Package = require('../model/Package');
const PasswordUtil = require('../util/PasswordUtil');
const UserRole = require('../constant/RoleConstant');


class FirstUserUtil {

    static async createFirstUser() {
        const email = "admin@admin.com";
        if(FirstUserUtil.isEmailAvailable(email)){
            const password = PasswordUtil.encryptPassword("admin@123");
            try{
                const firstUser = new User({
                    name: 'Admin',
                    email: email,
                    role: UserRole.ADMIN,
                    password: password,
                    mobileNo: 7892555555
                });
                const savedUser = await firstUser.save();
                
            } catch (error) {
                console.log("");
            }
        }else{
            console.log("");
        }
        
    }


    static async isEmailAvailable(email){
        try{
            const user = await UserDAO.getUserByEmail(email);
            return false;
        } catch (error) {
            return true;
        }
    }
}
  

module.exports = FirstUserUtil;