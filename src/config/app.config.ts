import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
	PORT: Number(process.env.PORT),
	// PRODUCTS_MICROSERVICE_HOST: process.env.PRODUCTS_MICROSERVICE_HOST,
	// PRODUCTS_MICROSERVICE_PORT: Number(process.env.PRODUCTS_MICROSERVICE_PORT),
	// ORDERS_MICROSERVICE_HOST: process.env.ORDERS_MICROSERVICE_HOST,
	// ORDERS_MICROSERVICE_PORT: Number(process.env.ORDERS_MICROSERVICE_PORT),
	// NATS
	NATS_SERVERS: process.env.NATS_SERVERS?.split(','),
}));
