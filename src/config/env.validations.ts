import * as Joi from 'joi';

export const envValidationSchema = Joi.object({
	// App
	PORT: Joi.number().required(),
	PRODUCTS_MICROSERVICE_HOST: Joi.string().required(),
	PRODUCTS_MICROSERVICE_PORT: Joi.number().required(),
	ORDERS_MICROSERVICE_HOST: Joi.string().required(),
	ORDERS_MICROSERVICE_PORT: Joi.number().required(),
}).unknown(true);
