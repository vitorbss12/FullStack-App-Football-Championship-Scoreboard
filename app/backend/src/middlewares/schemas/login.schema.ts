import * as Joi from 'joi';

const MESSAGE = 'All fields must be filled';

const loginSchema = Joi.object({
  email: Joi.string().required().messages({
    'any.required': `400|${MESSAGE}`,
    'string.base': `400|${MESSAGE}`,
    'string.empty': `400|${MESSAGE}`,
  }),
  password: Joi.string().required().messages({
    'any.required': `400|${MESSAGE}`,
    'string.base': `400|${MESSAGE}`,
    'string.empty': `400|${MESSAGE}`,
  }),
});

export default loginSchema;
