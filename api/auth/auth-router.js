const router = require("express").Router();
const bcrypt = require("bcryptjs");
const {
  checkUsernameFree,
  checkUsernameExists,
  checkPasswordLength,
} = require("./auth-middleware");
const User = require("../users/users-model");

router.post("/register", (req, res, next) => {
  const { username, password } = req.body;
  const hash = bcrypt.hashSync(password, 10);

  const userForDatabase = { username, password: hash };
});

router.post("/login", (req, res, next) => {
  res.json("login");
});

router.get("/logout", (req, res, next) => {
  res.json("logout");
});

router.get("/", function (req, res, next) {
  console.log("Router Working");
  res.end();
});

/**
  1 [POST] /api/auth/register { "username": "sue", "password": "1234" }

  response:
  status 200
  {
    "user_id": 2,
    "username": "sue"
  }

  response on username taken:
  status 422
  {
    "message": "Username taken"
  }

  response on password three chars or less:
  status 422
  {
    "message": "Password must be longer than 3 chars"
  }
 */

/**
  2 [POST] /api/auth/login { "username": "sue", "password": "1234" }

  response:
  status 200
  {
    "message": "Welcome sue!"
  }

  response on invalid credentials:
  status 401
  {
    "message": "Invalid credentials"
  }
 */

/**
  3 [GET] /api/auth/logout

  response for logged-in users:
  status 200
  {
    "message": "logged out"
  }

  response for not-logged-in users:
  status 200
  {
    "message": "no session"
  }
 */

module.exports = router;

// Don't forget to add the router to the `exports` object so it can be required in other modules
