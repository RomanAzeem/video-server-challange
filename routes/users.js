const express = require('express');
//import all the controller from Users Controller

//bring in the express-router params acception
const router = express.Router();

const {
  get_all_Users,
  get_single_User,
} = require('../controllers/usersController');

//define all the routes for '/'
router.get('/', get_all_Users);

//difine all the routes for '/:id'
router.get('/:id', get_single_User);

module.exports = router;
