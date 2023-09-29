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
    this.hotelService.create(requestBody).then();

    return { statusCode: HttpStatus.CREATED, message: 'CREATED' };
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
    const result: HotelDocumentInterface[] =
      await this.hotelService.getHotelsWithPag(query);

    return {
      statusCode: HttpStatus.OK,
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
