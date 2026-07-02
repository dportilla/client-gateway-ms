import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { envValidationSchema } from '@/config/env.validations';
import { systemConfig } from '@/config/system.config';
import { ProductsModule } from '@/products/products.module';
import { OrdersModule } from './orders/orders.module';
import { NatsModule } from './transports/nats/nats.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			load: systemConfig,
			validationSchema: envValidationSchema,
		}),
		ProductsModule,
		OrdersModule,
		NatsModule,
	],
})
export class AppModule {}
