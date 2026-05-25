import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ORDERS_SERVICE } from '@/config/services.microservices';
import { OrdersController } from './orders.controller';

@Module({
	imports: [
		ClientsModule.registerAsync([
			{
				name: ORDERS_SERVICE,
				inject: [ConfigService],
				useFactory: (configService: ConfigService) => ({
					transport: Transport.TCP,
					options: {
						host: configService.getOrThrow('app.ORDERS_MICROSERVICE_HOST'),
						port: configService.getOrThrow('app.ORDERS_MICROSERVICE_PORT'),
					},
				}),
			},
		]),
	],
	controllers: [OrdersController],
	providers: [],
})
export class OrdersModule {}
