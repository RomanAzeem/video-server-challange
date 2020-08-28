const express = require('express');
//import all the controller from Users Controller
const {
  get_all_Users,
  get_single_User,
  add_new_User,
  update_User,
  delete_User,
} = require('../controllers/usersController');

//bring in the express-router params acception
const router = express.Router({ mergeParams: true });

//define all the routes for '/'
router.route('/').get(get_all_Users).post(add_new_User);
//difine all the routes for '/:id'
router.route('/:id').get(get_single_User).put(update_User).delete(delete_User);

module.exports = router;
