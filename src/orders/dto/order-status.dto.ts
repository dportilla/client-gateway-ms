import { IsEnum, IsOptional } from 'class-validator';
import { OrderStatusEnum, OrderStatusList } from '@/orders/enum/order.enum';

export class OrderStatusDto {
	@IsOptional()
	@IsEnum(OrderStatusList, {
		message: `Status must be one of the following: ${OrderStatusList.join(', ')}`,
	})
	status!: OrderStatusEnum;
}
