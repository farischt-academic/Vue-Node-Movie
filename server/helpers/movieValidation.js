const Joi = require("joi");

module.exports.movieValidation = (data) => {
  const JoiSchema = Joi.object({
    title: Joi.string().min(2).required(),
    description: Joi.string().min(2).max(120).required(),
    url: Joi.string().min(10).required(),
    duration: Joi.string().min(2).required(),
    realisator: Joi.string().min(2).max(24).required(),
  });
  return JoiSchema.validate(data);
};
