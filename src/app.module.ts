import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { systemConfig } from './config/system.config';
import { envValidationSchema } from './config/env.validations';


@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    load: systemConfig,
    validationSchema: envValidationSchema
  })],
})
export class AppModule {}
