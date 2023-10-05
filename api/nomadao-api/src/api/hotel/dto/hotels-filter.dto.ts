import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';
import { HotelReviewAndStarsEnum } from '../../../common/interfaces/hotelReviewAndStars.interface';

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

  @IsNumber()
  @IsOptional()
  minPrice: number;

  @IsNumber()
  @IsOptional()
  maxPrice: number;

  @IsNumber()
  @IsOptional()
  rating: HotelReviewAndStarsEnum;

  @IsNumber()
  @IsOptional()
  reviews: HotelReviewAndStarsEnum;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  propertyTypes?: string[];

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  facilities?: string[];

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  hotelServices?: string[];
}
