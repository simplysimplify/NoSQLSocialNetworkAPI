const User = require("../models/User");
const Thought = require("../models/Thought");

module.exports = {
  getAllUsers(req, res) {
    User.find()
      .populate({ path: "thoughts" })
      .populate({ path: "friends" })
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .populate({ path: "thoughts" })
      .populate({ path: "friends" })
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with that ID" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
  updateUser(req, res) {
    User.findOneAndUpdate({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with that ID" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with that ID" })
          : Thought.deleteMany({ _id: { $in: user.thoughts } })
      )
      .then(() =>
        res.json({ message: "User and associated thoughts deleted!" })
      )
      .catch((err) => res.status(500).json(err));
  },
  addFriend(req, res) {
    return User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friend: req.body.friendId } },
      { new: true, runValidators: true }
    ).then((data) => {
      res.json(data);
    });
  },
  removeFriend(req, res) {
    return User.findOneAndDelete(
      { _id: req.params.userId },
      { $pull: { friend: req.params.friendId } },
      { new: true, runValidators: true }
    ).then((data) => {
      res.json(data);
    });
  },
};
