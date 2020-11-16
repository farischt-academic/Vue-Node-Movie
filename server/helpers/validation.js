const Joi = require("joi");

// Register Validation :
const registerValidation = (data) => {
  const JoiSchema = Joi.object({
    name: Joi.string().min(2).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
    repeatedPassword: Joi.ref("password"),
  });
  return JoiSchema.validate(data);
};

// Password Validation for the registration
const passwordValidation = (password, repeatedPassword) => {
  if (password != repeatedPassword) return false;
  return true;
};

// Login Validation
const loginValidation = (data) => {
  const JoiSchema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
  });
  return JoiSchema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.passwordValidation = passwordValidation;
module.exports.loginValidation = loginValidation;
