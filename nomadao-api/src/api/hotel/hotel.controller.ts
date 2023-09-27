import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { HotelService } from './hotel.service';
import { CreateHotelDto } from './dto/create-hote.dto';
import { ResponseDto } from '../../common/dto/http.dto';
import { Query as ExpressQuery } from 'express-serve-static-core';
import { HotelDocumentInterface } from './interfaces/hotel.interface';
import { throwNotFoundException } from 'src/common/utils/response.hendler';

@Controller('v1/hotel')
export class HotelController {
  constructor(private readonly hotelService: HotelService) {}

  @Post()
  public async createHotelDocument(
    @Body() requestBody: CreateHotelDto,
  ): Promise<ResponseDto> {
    this.hotelService.create(requestBody).then();

    return { statusCode: 201, message: 'OK' };
  }

  @Get()
  public async getAllHotelsWithPag(
    @Query() query: ExpressQuery,
  ): Promise<ResponseDto> {
    const result: HotelDocumentInterface[] =
      await this.hotelService.getAllHotelsWithPag(query);

    return {
      statusCode: 200,
      message: 'OK',
      content: result,
      total: result.length,
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
