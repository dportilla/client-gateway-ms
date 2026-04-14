import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
	port: Number(process.env.PORT),
	PRODUCTS_MICROSERVICE_HOST: process.env.PRODUCTS_MICROSERVICE_HOST,
	PRODUCTS_MICROSERVICE_PORT: Number(process.env.PRODUCTS_MICROSERVICE_PORT),
}));
