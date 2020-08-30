const express = require('express');
//import all the controller from Users Controller

//bring in the express-router params acception
const router = express.Router();

const {
  get_all_Users,
  get_single_User,
  register_User,
} = require('../controllers/usersController');

//route for get all users '/'
router.get('/all', get_all_Users);

//routes for get single user by name
router.get('/single', get_single_User);

//route for registering new user
router.post('/register', register_User);

module.exports = router;
