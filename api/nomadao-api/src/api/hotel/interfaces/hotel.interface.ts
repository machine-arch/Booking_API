import mongoose from 'mongoose';

export interface PropertyTypeInterface {
  apartments: boolean;
  hotels: boolean;
  homestays: boolean;
  villas: boolean;
  motels: boolean;
}

export interface FacilitiesInterface {
  wakeUpCall: boolean;
  crHire: boolean;
  flatTv: boolean;
  dryCleaning: boolean;
  internet: boolean;
}

export interface HotelServiceInterface {
  havanaLobbyBar: boolean;
  flestaRestaurant: boolean;
  hotelTransportService: boolean;
  laundryService: boolean;
  petsWelcome: boolean;
}

export interface HotelRoomsInterface {
  image: string;
  bedType: string;
  roomType: string;
  metaData: string;
  facilities: FacilitiesInterface;
  bedsCount: number;
  adultsCount: number;
  childrensCount: number;
  price: number;
  bookedDates: {
    startDate: Date;
    endDate: Date;
  }[];
}

export interface HotelDocumentInterface extends mongoose.Document {
  _id?: string;
  hotelName: string;
  rating: number;
  location: string;
  reviews: number;
  images: string[];
  metaData: string;
  description: string;
  longitude: number;
  latitude: number;
  infoAtHotel: string;
  roomAmenities: string;
  postalCode: number;
  yearOfContusion: number;
  socketType: string;
  totalRooms: number;
  serviceFee: string;
  price: number;
  propertyType: PropertyTypeInterface;
  facilities: FacilitiesInterface;
  hotelService: HotelServiceInterface;
  hotelRooms: HotelRoomsInterface[];
}
