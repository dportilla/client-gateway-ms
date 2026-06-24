import {
	Body,
	Controller,
	Get,
	Inject,
	Param,
	ParseUUIDPipe,
	Patch,
	Post,
	Query,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { PaginationDto } from '@/common';
import { ORDERS_SERVICE } from '@/config/services.microservices';
import { CreateOrderDto } from './dto/create-order.dto';

@Controller('orders')
export class OrdersController {
	constructor(
		@Inject(ORDERS_SERVICE) private readonly ordersClient: ClientProxy,
	) {}

	@Post()
	create(@Body() createOrderDto: CreateOrderDto) {
		return this.ordersClient.send({ cmd: 'create_order' }, createOrderDto);
	}

	@Get()
	findAll(@Query() paginationDto: PaginationDto) {
		return this.ordersClient.send({ cmd: 'get_all_orders' }, paginationDto);
	}

	@Get(':id')
	findOne(@Param('id', ParseUUIDPipe) id: string) {
		return this.ordersClient.send({ cmd: 'get_one_order' }, { id }).pipe(
			catchError((error) => {
				throw new RpcException(error);
			}),
		);
	}

	@Patch(':id')
	changeStatus(
		@Param('id', ParseUUIDPipe) id: string,
		@Body('status') status: string,
	) {
		return this.ordersClient
			.send(
				{ cmd: 'change_order_status' },
				{ id, status: status.toUpperCase() },
			)
			.pipe(
				catchError((error) => {
					throw new RpcException(error);
				}),
			);
	}
}
