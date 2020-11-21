const Joi = require("joi");

module.exports.movieValidation = (data) => {
  const JoiSchema = Joi.object({
    title: Joi.string().min(2).required(),
    description: Joi.string().min(2).max(120).required(),
    url: Joi.string().min(10).required(),
    // duration: Joi.string().min(2).required(),
    hours: Joi.number().required(),
    minutes: Joi.number().required(),
    realisator: Joi.string().min(2).max(24).required(),
    casting: Joi.array().required(),
    video: Joi.string().min(5).max(120).required(),
  });
  return JoiSchema.validate(data);
};
