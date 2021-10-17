const Joi = require('joi');

const userPost = Joi.object({
  userId: Joi.string().min(1).max(50).required(),
  username: Joi.string().min(1).max(50).required(),
  givenName: Joi.string().min(1).max(50).required(),
  familyName: Joi.string().min(1).max(50).required(),
  email: Joi.string().email().required(),
  role: Joi.string().valid('admin', 'base').required(),
});

const userGetById = Joi.object({
  userId: Joi.string().min(1).max(50).required(),
});

module.exports = { userPost, userGetById };
