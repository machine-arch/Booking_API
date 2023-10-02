import { Inject, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { MongooseModule } from '@nestjs/mongoose';
import { WINSTON_MODULE_PROVIDER, WinstonModule } from 'nest-winston';
import * as winston from 'winston';

const format: any = winston.format;

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HotelModule } from './api/hotel/hotel.module';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const ecsFormat: any = require('@elastic/ecs-winston-format');
const { combine, label } = format;

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    WinstonModule.forRoot({
      format: combine(
        ecsFormat({ convertReqRes: true }),
        label({ label: process.env.APP_LABEL }),
        winston.format.json(),
      ),
      transports: [new winston.transports.Console()],
    }),
    MongooseModule.forRoot(process.env.DATABASE_CONNECTION_URL_FROM_DOCKER),
    //MongooseModule.forRoot(process.env.DATABASE_CONNECTION_URL_FROM_LOCALHOST),
    // MongooseModule.forRoot(process.env.DATABASE_CONNECTION_URL),
    HotelModule,
  ],
  controllers: [AppController],
  providers: [AppService],
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
