import { Query } from 'express-serve-static-core';
import { Injectable } from '@nestjs/common';
import { CreateHotelDto } from './dto/create-hote.dto';
import { HotelDocumentInterface } from './interfaces/hotel.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { throwInternalErrorException } from 'src/common/utils/response.hendler';

@Injectable()
export class HotelService {
  constructor(
    @InjectModel('HOTELS')
    private readonly hotelModel: Model<HotelDocumentInterface>,
  ) {}

  public async create(hotel: CreateHotelDto): Promise<HotelDocumentInterface> {
    const createdHotel: HotelDocumentInterface = await new this.hotelModel(
      hotel,
    ).save();

    return createdHotel;
  }

  public async getAllHotelsWithPag(
    query: Query,
    filerQuery: Record<string, any> = null,
  ): Promise<HotelDocumentInterface[]> {
    const rePerPage = Number(query.limit);
    const currentPage: number = Number(query.page) || 1;
    const skip: number = rePerPage * (currentPage - 1);

    const hotelList: HotelDocumentInterface[] = await this.hotelModel
      .find(filerQuery)
      .select('-__v -createdAt -updatedAt')
      .limit(rePerPage)
      .skip(skip)
      .exec();

    if (!hotelList) throwInternalErrorException(process.env.APP_LANGUAGES);

    return hotelList;
  }

  public async getSingleHotel(id: string): Promise<HotelDocumentInterface> {
    return this.hotelModel.findById(id).exec();
  }
}
