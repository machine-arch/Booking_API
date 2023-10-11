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
  @IsOptional()
  apartments: boolean;

  @IsBoolean()
  @IsOptional()
  hotels: boolean;

  @IsBoolean()
  @IsOptional()
  homestays: boolean;

  @IsBoolean()
  @IsOptional()
  villas: boolean;

  @IsBoolean()
  @IsOptional()
  motels: boolean;
}

export class FacilitiesDto {
  @IsBoolean()
  @IsOptional()
  wakeUpCall: boolean;

  @IsBoolean()
  @IsOptional()
  crHire: boolean;

  @IsBoolean()
  @IsOptional()
  flatTv: boolean;

  @IsBoolean()
  @IsOptional()
  dryCleaning: boolean;

  @IsBoolean()
  @IsOptional()
  internet: boolean;
}

export class HotelServiceDto {
  @IsBoolean()
  @IsOptional()
  havanaLobbyBar: boolean;

  @IsBoolean()
  @IsOptional()
  flestaRestaurant: boolean;

  @IsBoolean()
  @IsOptional()
  hotelTransportService: boolean;

  @IsBoolean()
  @IsOptional()
  laundryService: boolean;

  @IsBoolean()
  @IsOptional()
  petsWelcome: boolean;
}

export class HotelRoomsDto {
  @IsString()
  @IsOptional()
  image: string;

  @IsString()
  @IsOptional()
  bedType: string;

  @IsString()
  @IsOptional()
  roomType: string;

  @IsOptional()
  @ValidateNested({ each: false })
  @Type(() => FacilitiesDto)
  facilities: FacilitiesDto;

  @IsNumber()
  @IsOptional()
  bedsCount: number;

  @IsNumber()
  @IsOptional()
  adultsCount: number;

  @IsNumber()
  @IsOptional()
  childrensCount: number;

  @IsNumber()
  @IsOptional()
  price: number;

  @IsArray()
  @IsOptional()
  bookedDates: {
    startDate: Date;
    endDate: Date;
  }[];
}

export class CreateHotelDto {
  @IsString()
  @IsOptional()
  hotelName: string;

  @IsNumber()
  @IsOptional()
  rating: number;

  @IsString()
  @IsOptional()
  location: string;

  @IsNumber()
  @IsOptional()
  reviews: number;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  images: string[];

  @IsOptional()
  metadata: string;

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
