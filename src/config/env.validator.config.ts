import * as Joi from 'joi';

export const validationSchema = Joi.object({
  DB_HOST: Joi.string(),
  DB_PORT: Joi.number(),
  DB_USERNAME: Joi.string(),
  DB_PASSWORD: Joi.string(),
  DB_DATABASE: Joi.string(),
});
