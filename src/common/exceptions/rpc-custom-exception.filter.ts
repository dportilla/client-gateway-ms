import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Response } from 'express';

@Catch(RpcException)
export class RpcCustomExceptionFilter implements ExceptionFilter<RpcException> {
	catch(exception: RpcException, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse<Response>();

		const rpcError = exception.getError();

		if (
			rpcError instanceof Error &&
			rpcError.message.includes('Empty response')
		) {
			const errorMessage = rpcError.message;
			return response.status(500).json({
				status: 500,
				message: errorMessage.substring(0, errorMessage.indexOf('(') - 1),
			});
		}

		if (
			typeof rpcError === 'object' &&
			'status' in rpcError &&
			typeof rpcError.status === 'number' &&
			'message' in rpcError
		) {
			return response.status(rpcError.status).json(rpcError);
		}

		response.status(400).json({
			status: 400,
			message: rpcError,
		});
	}
}
