import { IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class RoomsFilterDto {
  @IsString()
  @IsNotEmpty()
  @IsMongoId()
  hotelId: string;

  @IsString()
  @IsOptional()
  roomType: string;
}
