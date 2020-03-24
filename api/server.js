const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const session = require("express-session");

const usersRouter = require("../users/users-router.js");
const authRouter = require("../auth/router");
const restricted = require("../auth/restricted-middleware");

const server = express();

const sessionConfig = {
  name: "Cookie Monster",
  secret: "Keep it secret, keep it safe",
  cookie: {
    maxAge: 1000 * 60 * 60,
    secure: false, //should be true in production
    httpOnly: true //true means no access from javascript
  },
  resave: false,
  saveUninitialized: true //GDPR laws require to check with client before setting this to true
};

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(session(sessionConfig));

server.use("/api/users", restricted, usersRouter);
server.use("/api/auth", authRouter);

server.get("/", (req, res) => {
  res.json({ api: "up" });
});

module.exports = server;
