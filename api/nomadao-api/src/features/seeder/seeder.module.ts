import { Module } from '@nestjs/common';
import { SeederService } from './seeder.service';
import { SeederController } from './seeder.controller';
import { HotelModule } from 'src/api/hotel/hotel.module';
import { HotelService } from 'src/api/hotel/hotel.service';
import { MongooseModule } from '@nestjs/mongoose';
import { HotelSchema } from 'src/api/hotel/schemas/hotel.schema';

@Module({
  imports: [
    HotelModule,
    MongooseModule.forFeature([{ name: 'HOTELS', schema: HotelSchema }]),
  ],
  controllers: [SeederController],
  providers: [SeederService, HotelService],
})
export class SeederModule {}
