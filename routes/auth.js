const express = require('express');
const router = express.Router();

//Load Auth Controllers
const {
  login_User,
  update_User,
  delete_User,
} = require('../controllers/authController');

//Load Authentication middleware to Protect routes
const { protect } = require('../middleware/auth');

router.post('/login', login_User);
router.put('/update', protect, update_User);
router.delete('/delete', protect, delete_User);

module.exports = router;
