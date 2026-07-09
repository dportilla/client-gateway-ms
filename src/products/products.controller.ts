import {
	Body,
	Controller,
	Delete,
	Get,
	Inject,
	Param,
	ParseIntPipe,
	Patch,
	Post,
	Query,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { PaginationDto } from '@/common/dto/pagination.dto';
import { NATS_SERVICE } from '@/config/services.microservices';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
	constructor(
		@Inject(NATS_SERVICE) private readonly productsClient: ClientProxy,
	) {}

	@Post()
	create(@Body() createProductDto: CreateProductDto) {
		return this.productsClient.send(
			{ cmd: 'create_product' },
			createProductDto,
		);
	}

	@Get()
	findAll(@Query() paginationDto: PaginationDto) {
		return this.productsClient
			.send({ cmd: 'get_all_products' }, paginationDto)
			.pipe(
				catchError((error) => {
					throw new RpcException(error);
				}),
			);
	}

	@Post('seed')
	seed() {
		return this.productsClient.send({ cmd: 'seed_products' }, {}).pipe(
			catchError((error) => {
				throw new RpcException(error);
			}),
		);
	}

	@Get(':id')
	findOne(@Param('id', ParseIntPipe) id: number) {
		return this.productsClient.send({ cmd: 'get_one_product' }, { id }).pipe(
			catchError((error) => {
				throw new RpcException(error);
			}),
		);
	}

	@Patch(':id')
	update(
		@Param('id', ParseIntPipe) id: number,
		@Body() updateProductDto: UpdateProductDto,
	) {
		return this.productsClient
			.send({ cmd: 'update_product' }, { id, ...updateProductDto })
			.pipe(
				catchError((error) => {
					throw new RpcException(error);
				}),
			);
	}

	@Delete(':id')
	remove(@Param('id', ParseIntPipe) id: number) {
		return this.productsClient.send({ cmd: 'delete_product' }, { id }).pipe(
			catchError((error) => {
				throw new RpcException(error);
			}),
		);
	}
}
