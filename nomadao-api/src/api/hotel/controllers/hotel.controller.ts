import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { HotelService } from '../hotel.service';
import { CreateHotelDto } from '../dto/create-hote.dto';
import { ResponseDto } from '../../../common/dto/http.dto';
import { Query as ExpressQuery } from 'express-serve-static-core';
import { HotelDocumentInterface } from '../interfaces/hotel.interface';
import { throwNotFoundException } from '../../../common/utils/response.hendler';

@Controller('v1/hotel')
export class HotelController {
  constructor(private readonly hotelService: HotelService) {}

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

  @Get(':id')
  public async getSingleHotel(@Param('id') id: string): Promise<ResponseDto> {
    const result: HotelDocumentInterface =
      await this.hotelService.getSingleHotel(id);

    if (!result) throwNotFoundException(process.env.APP_LANGUAGES);

    return { statusCode: 200, message: 'OK', content: result };
  }
}
