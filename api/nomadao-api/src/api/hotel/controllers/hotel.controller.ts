import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { Query as ExpressQuery } from 'express-serve-static-core';
import { HotelService } from '../hotel.service';
import { CreateHotelDto } from '../dto/create-hotel.dto';
import { ResponseDto } from '../../../common/dto/http.dto';
import { HotelDocumentInterface } from '../interfaces/hotel.interface';
import { throwNotFoundException } from '../../../common/utils/response.hendler';

@Controller('v1/hotel')
export class HotelController {
  constructor(private readonly hotelService: HotelService) {}

  /**
   * create single hotel
   * @body requestbody - hotel data to be created
   * @returns A Promise of ResponseDto containing response message.
   */

  @Post()
  public async createHotelDocument(
    @Body() requestBody: CreateHotelDto,
  ): Promise<ResponseDto> {
    try {
      await this.hotelService.create(requestBody);

      return { statusCode: HttpStatus.CREATED, message: 'CREATED' };
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message,
      };
    }
  }

  /**
   * Get all hotels with pagination.
   * @param query - Query parameters for pagination.
   * @returns A Promise of ResponseDto containing paginated hotel data.
   */

  @Get()
  public async getAllHotelsWithPag(
    @Query() query: ExpressQuery,
  ): Promise<ResponseDto> {
    const result: { hotelList: HotelDocumentInterface[]; totalHotels: number } =
      await this.hotelService.getHotelsWithPag(query);

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
   * Get one hotels with its id.
   * @param id - id of the hotel.
   * @returns A Promise of ResponseDto containing single hotel data.
   */

  @Get(':id')
  public async getSingleHotel(@Param('id') id: string): Promise<ResponseDto> {
    const result: HotelDocumentInterface =
      await this.hotelService.getSingleHotel(id);

    if (!result) throwNotFoundException(process.env.APP_LANGUAGES);

    return { statusCode: HttpStatus.OK, message: 'OK', content: result };
  }
}
