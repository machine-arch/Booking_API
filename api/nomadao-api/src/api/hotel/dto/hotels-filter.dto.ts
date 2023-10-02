import { IsNumber, IsOptional, IsString } from 'class-validator';

export class HotelsFilterDto {
  @IsString()
  @IsOptional()
  location: string;

  @IsNumber()
  @IsOptional()
  roomsCount: number;

  @IsNumber()
  @IsOptional()
  adultsCount: number;

  @IsNumber()
  @IsOptional()
  childrensCount: number;

  @IsString()
  @IsOptional()
  startDate: string;

  @IsString()
  @IsOptional()
  endDate: string;
}
