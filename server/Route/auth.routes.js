const express = require("express");
const { signup, login, me, logout } = require("../Controller/auth.controller");
const Router = express.Router();
const protectauth = require("../Middleware/protectauth");

Router.post("/signup", signup);

Router.post("/login", login);

Router.get("/logout", logout);

Router.get("/me", protectauth, me);

module.exports = Router;
