import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PRODUCTS_SERVICE } from '../config/services.microservices';
import { ProductsController } from './products.controller';

@Module({
	imports: [
		ClientsModule.registerAsync([
			{
				name: PRODUCTS_SERVICE,
				inject: [ConfigService],
				useFactory: (configService: ConfigService) => ({
					transport: Transport.TCP,
					options: {
						host: configService.getOrThrow('app.PRODUCTS_MICROSERVICE_HOST'),
						port: configService.getOrThrow('app.PRODUCTS_MICROSERVICE_PORT'),
					},
				}),
			},
		]),
	],
	controllers: [ProductsController],
	providers: [],
})
export class ProductsModule {}
