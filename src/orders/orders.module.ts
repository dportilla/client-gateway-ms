import { Module } from '@nestjs/common';
import { NatsModule } from '@/transports/nats/nats.module';
import { OrdersController } from './orders.controller';

@Module({
	imports: [NatsModule],
	controllers: [OrdersController],
	providers: [],
})
export class OrdersModule {}
