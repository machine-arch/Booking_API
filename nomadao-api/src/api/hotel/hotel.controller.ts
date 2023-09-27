import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { HotelService } from './hotel.service';
import { CreateHotelDto } from './dto/create-hote.dto';
import { ResponseDto } from 'src/common/dto/http.dto';
import { Query as ExpressQuery } from 'express-serve-static-core';

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
    const result: any = await this.hotelService.getAllHotelsWithPag(query);
    return {
      statusCode: 200,
      message: 'OK',
      content: result,
      total: result.length,
    };
  }
}
