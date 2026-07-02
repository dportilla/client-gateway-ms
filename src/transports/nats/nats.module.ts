import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { NATS_SERVICE } from '@/config/services.microservices';

@Module({
	imports: [
		ClientsModule.registerAsync([
			{
				name: NATS_SERVICE,
				inject: [ConfigService],
				useFactory: (configService: ConfigService) => ({
					transport: Transport.NATS,
					options: {
						servers: configService.getOrThrow('app.NATS_SERVERS'),
					},
				}),
			},
		]),
	],
	exports: [ClientsModule],
})
export class NatsModule {}
