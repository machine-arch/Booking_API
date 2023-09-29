import { Body, Controller, Get, HttpStatus, Query } from '@nestjs/common';
import { Query as ExpressQuery } from 'express-serve-static-core';
import { ResponseDto } from 'src/common/dto/http.dto';
import { HotelDocumentInterface } from '../interfaces/hotel.interface';
import { HotelService } from '../hotel.service';

@Controller('v1/hotel-filter')
export class HotelFilterController {
  constructor(private readonly hotelService: HotelService) {}

  /**
   * Get filtered hotels based on query parameters and request body.
   * @param query - Query parameters for filtering and pagination.
   * @Body requestBody - Request body for additional filtering criteria.
   * @returns A Promise of ResponseDto containing filtered hotel data.
   */

  @Get()
  public async getFilteredHotels(
    @Query() query: ExpressQuery,
    @Body() requestBody: any,
  ): Promise<ResponseDto> {
    const result: HotelDocumentInterface[] =
      await this.hotelService.getFilteredHotels(query, requestBody);

    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      content: result,
      total: result.length,
    };
  }
}
