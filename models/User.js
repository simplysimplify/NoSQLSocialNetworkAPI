const thoughtSchema = require("./Thought");
const { Schema, model } = require("mongoose");

const userSchema = {
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (v) {
        return /^([\w\.-]+)@([\w\.-]+)\.([a-z]{2,6})$/.test(v);
      },
      message: (props) => `${props.value} is not a valid email address!`,
    },
    required: [true, "Email address required"],
  },
  thoughts: [
    {
      type: Schema.Types.ObjectId,
      ref: "thought",
    },
  ],
  friends: [
    {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  ],
};

userSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

module.exports = User;
