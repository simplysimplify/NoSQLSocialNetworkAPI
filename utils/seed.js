const connection = require("../config/connection");
const { Thought, User } = require("../models");

connection.on("error", (err) => err);

connection.once("open", async () => {
  console.log("connected");

  // Drop users
  await User.deleteMany({});

  // Drop existing students
  await Thought.deleteMany({});

  // Create array of users
  const users = [
    {
      username: "sev",
      email: "sev@gmail.com",
      thoughts: [],
    },
    {
      username: "foobar",
      email: "mrfu@gmail.com",
      thoughts: [],
    },
    {
      username: "benjamin",
      email: "benjamin@gmail.com",
      thoughts: [],
    },
  ];

  //create array of thoughts
  const thoughts = [
    {
      thoughtText: "Gun time",
      username: "benjamin",
    },
    {
      thoughtText: "Im not having fun",
      username: "sev",
    },
    {
      thoughtText: "this is not a user",
      username: "foobar",
    },
    {
      thoughtText: "the opposite of fun",
      username: "sev",
    },
    {
      thoughtText: "I dislike this",
      username: "foobar",
    },
    {
      thoughtText: "this is unfun",
      username: "benjamin",
    },
  ];

  // Add thoughts to the collection
  await Thought.collection.insertMany(thoughts);
  // for each thought push id to proper user
  thoughts.forEach((thought) => {
    users.forEach((user) => {
      if (thought.username === user.username) {
        user.thoughts.push(thought._id);
      }
    });
  });

  // Add users to the collection and await the results
  await User.collection.insertMany(users);

  // Log out the seed data to indicate what should appear in the database
  const userTable = [];
  users.forEach((user) => {
    const userRow = {
      username: user.username,
      email: user.email,
      _id: user._id,
    };
    userTable.push(userRow);
  });
  console.table(userTable);
  console.table(thoughts);
  console.info("Seeding complete! 🌱");
  process.exit(0);
});
