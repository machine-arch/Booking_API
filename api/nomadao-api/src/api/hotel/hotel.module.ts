import { Module } from '@nestjs/common';
import { HotelService } from './hotel.service';
import { HotelController } from './controllers/hotel.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { HotelSchema } from './schemas/hotel.schema';
import { HotelFilterController } from './controllers/hotel-filter.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'HOTELS', schema: HotelSchema }]),
  ],
  controllers: [HotelController, HotelFilterController],
  providers: [HotelService],
  exports: [HotelService],
})
export class HotelModule {}
