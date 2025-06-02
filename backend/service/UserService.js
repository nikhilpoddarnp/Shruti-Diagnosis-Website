const UserDAO = require('../dao/UserDAO');
const Users = require('../model/Users'); 
const PasswordUtil = require('../util/PasswordUtil');
const PropertyUtil = require('../util/PropertyUtil');
const UserRole = require('../constant/RoleConstant');
const AppointmentService = require('../service/AppointmentService');


class UserService {

    constructor(){
      global.userDAO = new UserDAO();
      global.appointmentService = new AppointmentService();
    }

    async createUser(data) {
      try {
        var user = new Users(data);
        var password = user.password;
        if(PropertyUtil.isEmpty(password)){
          throw new Error('Password should not be empty');
        }
        if(PropertyUtil.isEmpty(user.role)){
          user.role = UserRole.USER
        }
        user.password = PasswordUtil.encryptPassword(password);
        user = await global.userDAO.createUser(user); 
        return user; 
      } catch (error) {
        console.log(error.stack)
        throw new Error('Service Error: ' + error.message);
      }
    }

    async getUserById(id) {
    
        try {
          var user = await global.userDAO.getUserById(id); 
          user.password = '';
          return user;
        } catch (error) {
          throw new Error('Service Error: ' + error.message);
        }
    }

    async getUserRoleById(id) {
      try {
        var user = await global.userDAO.getUserById(id);
        return user.role;
      } catch (error) {
        throw new Error('Service Error: ' + error.message);
      }
    }

    async getUserByEmail(email) {
        try {
          const user = await global.userDAO.getUserByEmail(email); 
          user.password = '';
          return user;
        } catch (error) {
          throw new Error('Service Error: ' + error.message);
        }
    }

  async updateUserById(id, updateData) {
    try {
      var user = await global.userDAO.getUserById(id);
      var updatedUser = new Users(updateData);
      const password = updatedUser.password;
      PropertyUtil.copyProperties(updateData, user);
      var updatedUserData = new Users(user);
      if(PropertyUtil.isNotEmpty(password)){
        var encryptedPassword = PasswordUtil.encryptPassword(password);
        updatedUserData.password = encryptedPassword;
      }
      updatedUser = await global.userDAO.updateUser(updatedUserData);
      updatedUser.password = '';
      return updatedUser;
    } catch (error) {
      console.log(error.stack)
      throw new Error('Service Error: ' + error.message);
    }
  }

  async updatePassword(email, password) {
    try {
      var user = await global.userDAO.getUserByEmail(email);
      var updatedUserData = new Users(user);
      if(PropertyUtil.isNotEmpty(password)){
        var encryptedPassword = PasswordUtil.encryptPassword(password);
        updatedUserData.password = encryptedPassword;
      }
      let updatedUser = await global.userDAO.updateUser(updatedUserData);
      updatedUser.password = '';
      return updatedUser;
    } catch (error) {
      console.log(error.stack)
      throw new Error('Service Error: ' + error.message);
    }
  }

  async deleteUserById(userId) {
    try {
      const deletedUser = await global.userDAO.deleteUser(userId); 
      await global.appointmentService.deleteAppointForUser(userId);
      return deletedUser;
    } catch (error) {
      throw new Error('Service Error: ' + error.message);
    }
  }

  async getAllUsers() {
    try {
      const users = await global.userDAO.getAllUsers(); 
      return users;
    } catch (error) {
      throw new Error('Service Error: ' + error.message);
    }
  }
}

module.exports = UserService;