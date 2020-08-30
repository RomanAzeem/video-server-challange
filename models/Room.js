const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Provide a Room Name'],
  },
  host_user_id: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  host_user_name: {
    type: String,
    required: [true, 'Provide a Host Name'],
  },
  participants_users: {
    type: [String],
    ref: 'User',
    default: null,
  },
  limit: {
    type: Number,
    min: [1, 'Room must have atleast one Host'],
    default: 5,
  },
});

module.exports = mongoose.model('Room', RoomSchema);
