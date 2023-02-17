import * as Joi from 'joi';

export const validationSchema = Joi.object({
  test: Joi.string(),
});
