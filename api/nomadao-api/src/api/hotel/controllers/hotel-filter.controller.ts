import { Body, Controller, Get, HttpStatus, Post, Query } from '@nestjs/common';
import { Query as ExpressQuery } from 'express-serve-static-core';
import { ResponseDto } from '../../../common/dto/http.dto';
import { HotelDocumentInterface } from '../interfaces/hotel.interface';
import { HotelService } from '../hotel.service';
import { HotelsFilterDto } from '../dto/hotels-filter.dto';
import { KeyValuePairInterface } from '../../../common/interfaces/keyValuePair.interface';

@Controller('v1/hotel-filter')
export class HotelFilterController {
  constructor(private readonly hotelService: HotelService) {}

  /**
   * Get filtered hotels based on query parameters and request body.
   * @param query - Query parameters for filtering and pagination.
   * @Body requestBody - Request body for additional filtering criteria.
   * @returns A Promise of ResponseDto containing filtered hotel data.
   */

  @Post()
  public async getFilteredHotels(
    @Query() query: ExpressQuery,
    @Body() requestBody: HotelsFilterDto,
  ): Promise<ResponseDto> {
    const result: { hotelList: HotelDocumentInterface[]; totalHotels: number } =
      await this.hotelService.getFilteredHotels(query, requestBody);

    const hotels: HotelDocumentInterface[] = result.hotelList;
    const total: number = result.totalHotels;

    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      content: hotels,
      total: total,
    };
  }

  /**
   * Get locations stored in the database.
   * @returns A Promise of ResponseDto containing all locations stored in the database.
   */

  @Get('/ui-countries')
  public async getUiCountries(): Promise<ResponseDto> {
    const countries: string[] = await this.hotelService.getUiCountries();

    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      content: countries,
      total: countries.length,
    };
  }

  /**
   * Get advanced filter properties for hotels.
   * @returns A Promise of ResponseDto containing filer props for advanced filtering.
   */

  @Get('/advanced-filter')
  public async getAdvancedFilterProperties(): Promise<ResponseDto> {
    const result: {
      viewMode: KeyValuePairInterface[];
      sortBy: KeyValuePairInterface[];
      propertyType: KeyValuePairInterface[];
      facilities: KeyValuePairInterface[];
      hotelService: KeyValuePairInterface[];
    } = await this.hotelService.getAdvancedFilterProperties();

    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      content: result,
    };
  }
}
