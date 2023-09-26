import {
  IsArray,
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

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
