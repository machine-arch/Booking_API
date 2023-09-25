import { Inject, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { MongooseModule } from '@nestjs/mongoose';
import { WINSTON_MODULE_PROVIDER, WinstonModule } from 'nest-winston';
import * as winston from 'winston';

const format: any = winston.format;

import { AppController } from './app.controller';
import { AppService } from './app.service';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const ecsFormat: any = require('@elastic/ecs-winston-format');
const { combine, label } = format;

@Module({
  imports: [],
  controllers: [AppController],
  providers: [],
})
export class AppModule {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER)
    public readonly logger: winston.Logger,
  ) {
    console.info = (...args: any): any => logger.info.call(logger, ...args);
    console.warn = (...args: any): any => logger.warn.call(logger, ...args);
    console.error = (...args: any): any => logger.error.call(logger, ...args);
    console.debug = (...args: any): any => logger.debug.call(logger, ...args);
  }
}
