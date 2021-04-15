// Require the `restricted` middleware from `auth-middleware.js`. You will need it here!
const router = require("express").Router();
const bcrypt = require("bcryptjs");
const { find, findBy, findById, add } = require("./users-model");

router.get("/", (req, res, next) => {
  find()
    .then((users) => {
      if (Object.keys(users).length) {
        res.status(201).json(users);
      } else {
        res.status(401).json({
          message: "no users  found",
        });
      }
    })
    .catch(next);
});

router.get("/:filter", (req, res, next) => {
  const filter = req.params.filter;
  findBy(filter)
    .then((users) => {
      if (Object.keys(users).length) {
        res.status(201).json(users);
      } else {
        res.status(401).json({
          message: "no users  found",
        });
      }
    })
    .catch(next);
});

router.use((err, req, res, next) => {
  // eslint-disable-line
  res.status(500).json({
    sageAdvice: "Finding the real error is 90% of the bug fix",
    error: err.message,
    stack: err.stack,
  });
});

module.exports = router;

/**
 [GET] /api/users
 
 This endpoint is RESTRICTED: only authenticated clients
 should have access.
 
 response:
 status 200
 [
   {
     "user_id": 1,
     "username": "bob"
    },
    // etc
  ]
  
  response on non-authenticated:
  status 401
  {
    "message": "You shall not pass!"
  }
  */
