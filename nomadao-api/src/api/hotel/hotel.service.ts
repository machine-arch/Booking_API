import { Injectable } from '@nestjs/common';
import { CreateHotelDto } from './dto/create-hote.dto';
import { HotelDocumentInterface } from './interfaces/hotel.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class HotelService {
  constructor(
    @InjectModel('HOTELS')
    private readonly hotelModel: Model<HotelDocumentInterface>,
  ) {}

  public async create(hotel: CreateHotelDto): Promise<any> {
    const createdHotel: HotelDocumentInterface = new this.hotelModel(hotel);

    return createdHotel.save();
  }
}
