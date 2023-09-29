import { Query } from 'express-serve-static-core';
import { BadRequestException, Injectable } from '@nestjs/common';
import mongoose, { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateHotelDto } from './dto/create-hote.dto';
import {
  throwInternalErrorException,
  throwNotFoundException,
} from '../../common/utils/response.hendler';
import { HotelDocumentInterface } from './interfaces/hotel.interface';

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

  public async getHotelsWithPag(
    query: Query,
    filerQuery: Record<string, any> = null,
  ): Promise<{ hotelList: HotelDocumentInterface[]; totalHotels: number }> {
    const rePerPage = Number(query.limit) || 10;
    const currentPage: number = Number(query.page) || 1;
    const skip: number = rePerPage * (currentPage - 1);

    const hotelList: HotelDocumentInterface[] = await this.hotelModel
      .find(filerQuery)
      .select('-__v -createdAt -updatedAt')
      .limit(rePerPage)
      .skip(skip)
      .exec();

    if (!hotelList) throwInternalErrorException(process.env.APP_LANGUAGES);

    const totalHotels: number = await this.hotelModel
      .countDocuments(filerQuery)
      .exec();

    return { hotelList, totalHotels };
  }

  public async getFilteredHotels(query: Query, requestBody: any) {
    const filterObj: Record<string, any> = {};
    filterObj.location = requestBody.location;

    for (const key in filterObj) {
      if (filterObj[key] === undefined) delete filterObj[key];
    }

    return this.getHotelsWithPag(query, filterObj);
  }

  public async getSingleHotel(id: string): Promise<HotelDocumentInterface> {
    const isValidId: boolean = mongoose.Types.ObjectId.isValid(id);

    if (!isValidId) throw new BadRequestException('INVALID_ID');

    const hotel: HotelDocumentInterface = await this.hotelModel
      .findById(id)
      .exec();

    if (!hotel) throwNotFoundException(process.env.APP_LANGUAGES);

    return hotel;
  }
}
