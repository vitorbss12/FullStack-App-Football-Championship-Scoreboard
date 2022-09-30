import * as Joi from 'joi';

const MESSAGE = 'All fields must be filled';

const createMatchSchema = Joi.object({
  homeTeam: Joi.number().required().messages({
    'any.required': `400|${MESSAGE}`,
    'number.base': `400|${MESSAGE}`,
    'number.empty': `400|${MESSAGE}`,
  }),
  awayTeam: Joi.number().required().messages({
    'any.required': `400|${MESSAGE}`,
    'number.base': `400|${MESSAGE}`,
    'number.empty': `400|${MESSAGE}`,
  }),
  homeTeamGoals: Joi.number().required().messages({
    'any.required': `400|${MESSAGE}`,
    'number.base': `400|${MESSAGE}`,
    'number.empty': `400|${MESSAGE}`,
  }),
  awayTeamGoals: Joi.number().required().messages({
    'any.required': `400|${MESSAGE}`,
    'number.base': `400|${MESSAGE}`,
    'number.empty': `400|${MESSAGE}`,
  }),
});

export default createMatchSchema;
