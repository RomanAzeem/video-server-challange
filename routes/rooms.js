const express = require('express');
//import all the controller from Users Controller

//bring in the express-router params acception
const router = express.Router();

const {
  create_Room,
  info_Room,
  all_Room,
  search_Room,
  change_roomHost,
} = require('../controllers/roomController');

//Load Authentication middleware to Protect routes

const { protect } = require('../middleware/auth');

router.post('/info/:id', info_Room);
router.get('/info', all_Room);
router.get('/search', protect, search_Room);
router.put('/change_host', protect, change_roomHost);
router.post('/create', protect, create_Room);

module.exports = router;
