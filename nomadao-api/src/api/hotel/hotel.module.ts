import { Module } from '@nestjs/common';
import { HotelService } from './hotel.service';
import { HotelController } from './hotel.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { HotelSchema } from './schemas/hotel.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'HOTELS', schema: HotelSchema }]),
  ],
  controllers: [HotelController],
  providers: [HotelService],
})
export class HotelModule {}
