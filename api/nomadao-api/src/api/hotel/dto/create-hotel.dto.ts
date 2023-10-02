import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class PropertyTypeDto {
  @IsBoolean()
  @IsNotEmpty()
  apartments: boolean;

  @IsBoolean()
  @IsNotEmpty()
  hotels: boolean;

  @IsBoolean()
  @IsNotEmpty()
  homestays: boolean;

  @IsBoolean()
  @IsNotEmpty()
  villas: boolean;

  @IsBoolean()
  @IsNotEmpty()
  motels: boolean;
}

export class FacilitiesDto {
  @IsBoolean()
  @IsNotEmpty()
  wakeUpCall: boolean;

  @IsBoolean()
  @IsNotEmpty()
  crHire: boolean;

  @IsBoolean()
  @IsNotEmpty()
  flatTv: boolean;

  @IsBoolean()
  @IsNotEmpty()
  dryCleaning: boolean;

  @IsBoolean()
  @IsNotEmpty()
  internet: boolean;
}

export class HotelServiceDto {
  @IsBoolean()
  @IsNotEmpty()
  havanaLobbyBar: boolean;

  @IsBoolean()
  @IsNotEmpty()
  flestaRestaurant: boolean;

  @IsBoolean()
  @IsNotEmpty()
  hotelTransportService: boolean;

  @IsBoolean()
  @IsNotEmpty()
  laundryService: boolean;

  @IsBoolean()
  @IsNotEmpty()
  petsWelcome: boolean;
}

export class HotelRoomsDto {
  @IsString()
  @IsOptional()
  image: string;

  @IsString()
  @IsOptional()
  bedType: string;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => FacilitiesDto)
  facilities: FacilitiesDto;

  @IsNumber()
  @IsNotEmpty()
  bedsCount: number;

  @IsNumber()
  @IsOptional()
  adultsCount: number;

  @IsNumber()
  @IsOptional()
  childrensCount: number;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsArray()
  @IsNotEmpty()
  bookedDates: {
    startDate: Date;
    endDate: Date;
  }[];
}

export class CreateHotelDto {
  @IsString()
  @IsNotEmpty()
  hotelName: string;

  @IsNumber()
  @IsOptional()
  rating: number;

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsNumber()
  @IsOptional()
  reviews: number;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  images: string[];

  @IsString()
  @IsOptional()
  description: string;

  @IsNumber()
  @IsOptional()
  longitude: number;

  @IsNumber()
  @IsOptional()
  latitude: number;

  @IsString()
  @IsOptional()
  infoAtHotel: string;

  @IsString()
  @IsOptional()
  roomAmenities: string;

  @IsNumber()
  @IsOptional()
  postalCode: number;

  @IsNumber()
  @IsOptional()
  yearOfContusion: number;

  @IsString()
  @IsOptional()
  socketType: string;

  @IsNumber()
  @IsOptional()
  totalRooms: number;

  @IsString()
  @IsOptional()
  serviceFee: string;

  @IsNumber()
  @IsOptional()
  price: number;

  @ValidateNested()
  @Type(() => PropertyTypeDto)
  propertyType: PropertyTypeDto;

  @ValidateNested()
  @Type(() => FacilitiesDto)
  facilities: FacilitiesDto;

  @ValidateNested()
  @Type(() => HotelServiceDto)
  hotelService: HotelServiceDto;

  @ValidateNested()
  @Type(() => HotelRoomsDto)
  hotelRooms: HotelRoomsDto[];
}
