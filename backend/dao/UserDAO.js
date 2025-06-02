const Users = require('../model/Users'); 

class UserDAO {

  async createUser(user) {
    try {
        const saveUser = await user.save(); 
        saveUser.password = ''
      return saveUser;
    } catch (error) {
      throw new Error('Error creating user: ' + error.message);
    }
  }


  async getAllUsers() {
    try {
      const users = await Users.find().exec(); 
      return users;
    } catch (error) {
      throw new Error('Error fetching users: ' + error.message);
    }
  }

  async getUserById(userId) {
    try {
      const user = await Users.findOne({id: userId}).exec();
      if (!user) {
        throw new Error('User not found');
      }
      return user;
    } catch (error) {
      throw new Error('Error fetching user: ' + error.message);
    }
  }

  async getUserByEmail(email) {
    try {
      const user = await Users.findOne({email: email}).exec();
      if (!user) {
        throw new Error('User not found');
      }
      return user;
    } catch (error) {
      throw new Error('Error fetching user: ' + error.message);
    }
  }


  async updateUser(updatedUserData) {
    try {
      const user = await updatedUserData.save();
      if (!user) {
        throw new Error('User not found');
      }
      user.password = ''
      return user;
    } catch (error) {
      throw new Error('Error updating user: ' + error.message);
    }
  }


  async deleteUser(userId) {
    try {
      const user = await Users.findOneAndDelete({id: userId}).exec(); 
      Utility.wait(UserDAO.waitTimeInMS);
      if (!user) {
        throw new Error('User not found');
      }
      user.password = ''
      return user;
    } catch (error) {
      throw new Error('Error deleting user: ' + error.message);
    }
  }
}

module.exports = UserDAO;
