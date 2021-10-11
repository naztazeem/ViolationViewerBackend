const Joi = require('joi');

const validateRequestSchema = (schema, property) => {
  return (req, res, next) => {
    const { error } = schema.validate(req[property]);
    const valid = error == null;

    if (valid) {
      console.log('valid schema!');
      next();
    } else {
      const { details } = error;
      const message = details.map((i) => i.message).join(',');
      console.log('validate request schema error: ', error);
      console.log('validate request schema error message: ', message);
      res.status(422).json({ error: message });
    }
  };
};

module.exports = validateRequestSchema;
