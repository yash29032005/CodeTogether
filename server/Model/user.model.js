const mongoose = require("mongoose");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const complexitySchema = {
  min: 6,
  max: 10,
  upperCase: 1,
  numeric: 1,
  symbol: 1,
};

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("Users", userSchema);

function validateSignup(data) {
  const Schema = {
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: passwordComplexity(complexitySchema),
  };
  return Joi.object(Schema).validate(data);
}

function validateLogin(data) {
  const Schema = {
    email: Joi.string().email().required(),
    password: passwordComplexity(complexitySchema),
  };
  return Joi.object(Schema).validate(data);
}

module.exports = {
  User: User,
  validateSignup: validateSignup,
  validateLogin: validateLogin,
};
