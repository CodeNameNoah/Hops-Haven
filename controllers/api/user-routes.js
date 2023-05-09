// Importing dependencies
const router = require("express").Router();
const { User } = require("../../models");

// Create a new user route /api/users
router.post("/", async (req, res) => {
  try {
    // Creating new user with provided username and password
    const newUser = await User.create({
      username: req.body.username,
      password: req.body.password,
    });

    // Save session data
    req.session.save(() => {

      // Store the user's ID, username, and logged-in status in the session
      req.session.userId = newUser.id;
      req.session.username = newUser.username;
      req.session.loggedIn = true;

      // Sending new user data as response
      res.status(200).json(newUser);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// User login route /login
router.post("/login", async (req, res) => {
  try {
    // Finding a user with the provided username
    const newUser = await User.findOne({
      where: {
        username: req.body.username,
      },
    });

    // Checking to see if the user exists
    if (!newUser) {
      res.status(400).json({
        message: "Username or Password is incorrect, please try again.",
      });
      return;
    }

    // Checking if password is correct
    const loginPw = newUser.checkPassword(req.body.password);

    if (!loginPw) {
      res.status(400).json({
        message: "Username or Password is incorrect, please try again.",
      });
      return;
    }

    // Saving session data
    req.session.save(() => {

      // Store the user's ID, username, and logged-in status in the session
      req.session.userId = newUser.id;
      req.session.username = newUser.username;
      req.session.loggedIn = true;

      // Letting the user know they have successfully logged in
      res.status(200).json({ user: newUser, message: "You are logged in!" });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Log out route /api/users/logout
router.post("/logout", (req, res) => {
  // Checking to see if the user is actually logged in
  if (req.session.loggedIn) {
    // Destroy the session
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    // If user isn't logged in send 404 status
    res.status(404).end();
  }
});

// Exporting router
module.exports = router