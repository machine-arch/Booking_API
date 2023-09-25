import { Inject, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { MongooseModule } from '@nestjs/mongoose';
import { WINSTON_MODULE_PROVIDER, WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { HeadsetModule } from './api/headset/headset.module';
import { LaptopModule } from './api/laptop/laptop.module';
import { MonitorModule } from './api/monitor/monitor.module';
import { UserModule } from './api/user/user.module';
import { WindowsPcModule } from './api/windows_pc/windows_pc.module';

const format: any = winston.format;

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DataBridgeModule } from './data-bridge/data-bridge.module';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const ecsFormat: any = require('@elastic/ecs-winston-format');
const { combine, label } = format;

@Module({
  imports: [
    // CacheModule.register({
    //   isGlobal: true,
    //   ttl: 30000, // seconds
    // }),
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
    //MongooseModule.forRoot('mongodb://mongoDb:27017/asset-api'),
    MongooseModule.forRoot('mongodb://127.0.0.1:25027/asset-api'),
    HeadsetModule,
    LaptopModule,
    WindowsPcModule,
    MonitorModule,
    UserModule,
    DataBridgeModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: CacheInterceptor,
    // },
  ],
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
