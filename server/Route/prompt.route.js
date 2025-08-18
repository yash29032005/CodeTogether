const express = require("express");
const { getReply } = require("../Controller/prompt.controller");
const Router = express.Router();
const rateLimit = require("express-rate-limit");

const aiLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 3, // allow 5 AI calls per minute per IP
  message: { error: "Too many AI requests. Please wait." },
  standardHeaders: true,
  legacyHeaders: false,
});

Router.post("/", aiLimiter, getReply);

module.exports = Router;
