const router = require("express").Router();
const bcrypt = require("bcryptjs");
const {
  checkUsernameFree,
  checkUsernameExists,
  checkPasswordLength,
} = require("./auth-middleware");
const User = require("../users/users-model");

router.post(
  "/register",
  checkUsernameFree,
  checkPasswordLength,
  (req, res, next) => {
    const { username, password } = req.body;
    const hash = bcrypt.hashSync(password, 10);

    const userForDatabase = { username, password: hash };

    User.add(userForDatabase)
      .then((user) => {
        res.status(201).json(user);
      })
      .catch(next);
  }
);

router.post("/login", checkUsernameExists, (req, res, next) => {
  const { username, password } = req.body;
  User.findBy({ username })
    .then((user) => {
      if (user && bcrypt.compareSync(password, user.password)) {
        req.session.user = user;
        res.status(200).json({
          message: `Welcome ${username}`,
        });
      } else {
        res.status(401).json({
          message: "invalid credentials",
        });
      }
    })
    .catch(next);
});

router.get("/logout", (req, res, next) => {
  if (req.session && req.session.user) {
    req.session.destroy((err) => {
      if (err) {
        res.json("logout failed");
      } else {
        res.status(200).json({ message: "logged out" });
      }
    });
  } else {
    res.status(200).json({
      message: "no session",
    });
  }
});

router.get("/", function (req, res, next) {
  console.log("Router Working");
  res.end();
});

// eslint-disable-next-line
router.use((err, req, res, next) => {
  res.status(500).json({
    sageAdvice: "Finding the real error is 90% of the bug fix",
    error: err.message,
    stack: err.stack,
  });
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
