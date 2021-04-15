const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const session = require("express-session");
// const KnexSessionStore = require('connect-session-store')(session)

/**
  Do what needs to be done to support sessions with the `express-session` package!
  To respect users' privacy, do NOT send them a cookie unless they log in.
  This is achieved by setting 'saveUninitialized' to false, and by not
  changing the `req.session` object unless the user authenticates.

  Users that do authenticate should have a session persisted on the server,
  and a cookie set on the client. The name of the cookie should be "chocolatechip".

  The session can be persisted in memory (would not be adecuate for production)
  or you can use a session store like `connect-session-knex`.
 */

const authRouter = require("./auth/auth-router");
const userRouter = require("./users/users-router");

const server = express();

server.use(
  session({
    name: "chimp",
    secret: "mysecreter", // should be in env variable
    cookie: {
      maxAge: 1000 * 60 * 60,
      secure: false,
      httpOnly: false,
    },
    resave: false,
    saveUninitialized: false,
  })
);
server.use(helmet());
server.use(express.json());
server.use(cors());

server.use("/api/auth", authRouter);
server.use("/api/user", userRouter);

server.get("/", (req, res) => {
  console.log(req.session);
  res.json({ api: "up" });
});

// eslint-disable-next-line
server.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  });
});

module.exports = server;
