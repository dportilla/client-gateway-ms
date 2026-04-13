import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	const configService = app.get(ConfigService);

	const port = configService.get('app.port');

	const logger = new Logger('Gategway');

	await app.listen(port);
	logger.log(`Gateway is running on port ${port}`);
}
bootstrap();
