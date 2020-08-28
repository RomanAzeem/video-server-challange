const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide name'],
  },
  password: {
    type: String,
    required: [true, 'Pleaes provide passwor'],
  },
  mobile_option: {
    type: String,
  },
});
module.exports = mongoose.model('User', UserSchema);
