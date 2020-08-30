const asyncHandler = require('../middleware/async');
const { findOne } = require('../models/Room');
const Room = require('../models/Room');
const User = require('../models/User');

// @desc     Get Room Info
// @route    POST api/room/info
// @access   Public
exports.info_Room = asyncHandler(async (req, res, next) => {
  const infoRoom = await Room.findById(req.params.id);
  res.status(200).json({
    success: true,
    data: infoRoom,
  });
});

// @desc     Get Room Info
// @route    POST api/room/info
// @access   Public
exports.all_Room = asyncHandler(async (req, res, next) => {
  const infoRoom = await Room.find({});
  res.status(200).json({
    success: true,
    data: infoRoom,
  });
});

// @desc     Search Room with User
// @route    POST api/room/info
// @access   Private Protected
exports.search_Room = asyncHandler(async (req, res, next) => {
  const host_user = req.body.name;
  if (host_user != req.user.name) {
    res.status(200).json({
      success: false,
      message: 'User does not exist',
    });
  }
  const user_in_Rooms = await Room.find({ host_user });
  res.status(200).json({
    success: true,
    data: user_in_Rooms,
  });
});

// @desc     Create new Room (Signed in User)
// @route    POST api/room/create
// @access   Private Protected

exports.create_Room = asyncHandler(async (req, res, next) => {
  const { name, participants_users, limit } = req.body;
  const host_user_id = req.user.id;
  const host_user_name = req.user.name;
  if (!limit) {
    if (participants_users.length > 5) {
      res.status(400).json({
        success: false,
        message: '5 Particpants are Allowed',
      });
    }
  }
  if (participants_users.length > limit) {
    res.status(400).json({
      success: false,
      message: `${limit} Particpants are Allowed`,
    });
  }
  if (!name) {
    res.status(400).json({
      success: false,
      message: 'Please provide a name for Room',
    });
  }
  const room = await Room.create({
    name,
    host_user_id,
    host_user_name,
    participants_users,
    limit,
  });
  res.status(200).json({
    success: true,
    data: room,
  });
});

// @desc     Change host with signed as host user
// @route    PUT api/room/change-host
// @access   priivate protected
exports.change_roomHost = asyncHandler(async (req, res, next) => {
  const users = await User.find({ _id: { $nin: [req.user.id] } });

  const newHost = users.filter((user) => user.name === req.body.host_name);

  const fieldsToUpdate = {
    host_user_id: newHost[0]._id,
    host_user_name: newHost[0].name,
  };

  const roomWithUpdatedHost = await Room.findByIdAndUpdate(
    req.params.id,
    fieldsToUpdate,
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(200).json({
    success: true,
    data: roomWithUpdatedHost,
  });
});

// @desc     Join or Leave as signed current User
// @route    PUT api/room/join-leave
exports.join_leave_Room = asyncHandler(async (req, res, next) => {});
