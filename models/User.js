const { Schema, model } = require("mongoose");
const thoughtSchema = require("./Thought");

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: [true, "Username is required"],
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      //validate email address
      validate: {
        validator: function (v) {
          return /^([\w\.-]+)@([\w\.-]+)\.([a-z]{2,6})$/.test(v);
        },
        message: (props) => `${props.value} is not a valid email address!`,
      },
      required: [true, "Email address required"],
    },
    // array of thoughs referencing the thought model
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "thought",
      },
    ],
    // array of friends refferencing the user model
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// virtual to count the number of friends
userSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

const User = model("user", userSchema);

module.exports = User;
