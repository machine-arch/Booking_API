import { Body, Controller, Post } from '@nestjs/common';
import { HotelService } from './hotel.service';
import { CreateHotelDto } from './dto/create-hote.dto';
import { ResponseDto } from 'src/common/dto/http.dto';

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
}
