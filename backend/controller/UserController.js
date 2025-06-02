const UserService = require('../service/UserService'); 

class UserController {
  
  constructor(){
    global.userService = new UserService();
  }

  async createUser(req, res) {
    const data = req.body; 
    console.log(data);
    try {
      const user = await global.userService.createUser(data); 
      res.status(201).json(user); 
    } catch (error) {
      console.log(error.stack);
      res.status(500).json({ message: error.message }); 
    }
  }


  async getUserById(req, res) {
    const { id } = req.params; 
    try {
      const user = await global.userService.getUserById(id);
      res.status(200).json(user); 
    } catch (error) {
      console.log(error.stack);
      res.status(404).json({ message: error.message }); 
    }
  }


  async updateUserById(req, res) {
    const { id } = req.params; 
    const updateData = req.body; 
    try {
      const updatedUser = await global.userService.updateUserById(id, updateData); 
      res.status(200).json(updatedUser); 
    } catch (error) {
      console.log(error.stack);
      res.status(404).json({ message: error.message });
    }
  }

  
  async deleteUserById(req, res) {
    const { id } = req.params; 
    try {
      const deletedUser = await global.userService.deleteUserById(id); 
      res.status(200).json(deletedUser); 
    } catch (error) {
      console.log(error.stack);
      res.status(404).json({ message: error.message }); 
    }
  }

  async getAllUsers(req, res) {
    try {
      const users = await global.userService.getAllUsers(); 
      res.status(200).json(users); 
    } catch (error) {
      console.log(error.stack);
      res.status(500).json({ message: error.message }); 
    }
  }
}

module.exports = UserController;
