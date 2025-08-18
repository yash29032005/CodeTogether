const express = require("express");
const Router = express.Router();
const prompt = require("./prompt.route");
const auth = require("./auth.routes");

Router.use("/ai", prompt);
Router.use("/auth", auth);

module.exports = Router;
