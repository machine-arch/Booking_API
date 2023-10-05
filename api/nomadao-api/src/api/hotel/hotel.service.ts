import * as fs from 'fs';
import { Query } from 'express-serve-static-core';
import { BadRequestException, Injectable } from '@nestjs/common';
import mongoose, { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateHotelDto } from './dto/create-hotel.dto';
import {
  throwInternalErrorException,
  throwNotFoundException,
} from '../../common/utils/response.hendler';
import { HotelDocumentInterface } from './interfaces/hotel.interface';
import { HotelsFilterDto } from './dto/hotels-filter.dto';
import { KeyValuePairInterface } from '../../common/interfaces/keyValuePair.interface';
import { LocationSuggestionsDto } from './dto/location-suggetion.dto';

@Injectable()
export class HotelService {
  constructor(
    @InjectModel('HOTELS')
    private readonly hotelModel: Model<HotelDocumentInterface>,
  ) {}

  public async getHotelsWithPag(
    query: Query,
    filerQuery: Record<string, any> = null,
  ): Promise<{ hotelList: HotelDocumentInterface[]; totalHotels: number }> {
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

    const totalHotels: number = await this.hotelModel.countDocuments(
      filerQuery,
    );

    return { hotelList, totalHotels };
  }

  public async getFilteredHotels(query: Query, requestBody: HotelsFilterDto) {
    const filterObj: Record<string, any> = {};

    // Filter by location
    if (requestBody.location) {
      filterObj.location = requestBody.location;
    }

    // Filter by dates
    if (requestBody.startDate || requestBody.endDate) {
      const dateFilter: Record<string, any> = {};

      if (requestBody.startDate) {
        dateFilter.$gte = new Date(requestBody.startDate);
      }

      if (requestBody.endDate) {
        dateFilter.$lte = new Date(requestBody.endDate);
      }

      filterObj['hotelRooms.bookedDates.startDate'] = {
        $nin: [dateFilter.$lte, dateFilter.$gte],
      };

      filterObj['hotelRooms.bookedDates.endDate'] = {
        $nin: [dateFilter.$lte, dateFilter.$gte],
      };
    }

    // Filter hotels with exactly roomsCount rooms
    if (requestBody.roomsCount) {
      filterObj['$expr'] = {
        $eq: [{ $size: '$hotelRooms' }, requestBody.roomsCount],
      };
    }

    // Filter by adultsCount
    if (requestBody.adultsCount) {
      filterObj['hotelRooms'] = {
        $elemMatch: {
          adultsCount: requestBody.adultsCount,
        },
      };
    }

    // Filter by childrensCount
    if (requestBody.childrensCount) {
      filterObj['hotelRooms'] = {
        $elemMatch: {
          childrensCount: requestBody.childrensCount,
        },
      };
    }

    // Filter by price
    if (requestBody.minPrice || requestBody.maxPrice) {
      const priceFilter: Record<string, any> = {};

      if (requestBody.minPrice) {
        priceFilter.$gte = requestBody.minPrice;
      }

      if (requestBody.maxPrice) {
        priceFilter.$lte = requestBody.maxPrice;
      }

      filterObj['hotelRooms.price'] = priceFilter;
    }

    //filter by hotel rating
    if (requestBody.rating) {
      filterObj.rating = requestBody.rating;
    }

    //filter by hotel review
    if (requestBody.reviews) {
      filterObj.reviews = requestBody.reviews;
    }

    //filter by property type
    if (requestBody.propertyTypes && requestBody.propertyTypes.length > 0) {
      const propertyTypeFilter = {
        $or: requestBody.propertyTypes.map((propertyType) => ({
          [`propertyType.${propertyType}`]: true,
        })),
      };
      filterObj['$or'] = propertyTypeFilter.$or;
    }

    //filter by facilities
    if (requestBody.facilities && requestBody.facilities.length > 0) {
      const facilitiesFilter = {
        $or: requestBody.facilities.map((facility) => ({
          [`facilities.${facility}`]: true,
        })),
      };
      filterObj['$or'] = facilitiesFilter.$or;
    }

    //filter by hotel services
    if (requestBody.hotelServices && requestBody.hotelServices.length > 0) {
      const hotelServicesFilter = {
        $or: requestBody.hotelServices.map((hotelService) => ({
          [`hotelService.${hotelService}`]: true,
        })),
      };
      filterObj['$or'] = hotelServicesFilter.$or;
    }

    for (const key in filterObj) {
      if (filterObj[key] === undefined) delete filterObj[key];
    }

    return this.getHotelsWithPag(query, filterObj);
  }

  public async getSugestions(
    requestBody: LocationSuggestionsDto,
  ): Promise<string[]> {
    const suggestionString: string = requestBody.locationSuggestions;
    const regex = new RegExp(`^${suggestionString}`, 'i');
    const sugestions: string[] = await this.hotelModel
      .find({ location: { $regex: regex } })
      .distinct('location')
      .exec();

    return sugestions;
  }

  public async getUiCountries(): Promise<string[]> {
    const countries: string[] = await this.hotelModel
      .distinct('location')
      .exec();

    return countries;
  }

  public async getAdvancedFilterProperties(): Promise<{
    viewMode: KeyValuePairInterface[];
    sortBy: KeyValuePairInterface[];
    propertyType: KeyValuePairInterface[];
    facilities: KeyValuePairInterface[];
    hotelService: KeyValuePairInterface[];
  }> {
    const [viewMode, sortBy, propertyType, facilities, hotelService] =
      await Promise.all([
        JSON.parse(fs.readFileSync('src/common/data/viewMode.json', 'utf-8')),
        JSON.parse(fs.readFileSync('src/common/data/sort.json', 'utf-8')),
        JSON.parse(
          fs.readFileSync('src/common/data/propertyType.json', 'utf-8'),
        ),
        JSON.parse(fs.readFileSync('src/common/data/facilities.json', 'utf-8')),
        JSON.parse(
          fs.readFileSync('src/common/data/hotelService.json', 'utf-8'),
        ),
      ]);

    return { viewMode, sortBy, propertyType, facilities, hotelService };
  }

  // not used services

  public async create(hotel: CreateHotelDto): Promise<HotelDocumentInterface> {
    const createdHotel: HotelDocumentInterface = await new this.hotelModel(
      hotel,
    ).save();

    return createdHotel;
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
