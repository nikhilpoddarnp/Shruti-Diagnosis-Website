const express = require('express');
const UserController = require('../controller/UserController'); 

const userRouters = express.Router(); 

const userController = new UserController();

userRouters.post('/', userController.createUser);
userRouters.get('/:id', userController.getUserById);


userRouters.put('/:id', userController.updateUserById);

userRouters.delete('/:id', userController.deleteUserById);

userRouters.get('/', userController.getAllUsers);

module.exports = userRouters;
