import mongoose from 'mongoose';

export interface HotelDocumentInterface extends mongoose.Document {
  _id?: string;
  hotelName: string;
  rating: number;
  location: string;
  reviews: number;
  images: string[];
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
  apartments: boolean;
  hotels: boolean;
  homestays: boolean;
  villas: boolean;
  motels: boolean;
  wakeUpCall: boolean;
  crHire: boolean;
  flatTv: boolean;
  dryCleaning: boolean;
  internet: boolean;
  havanaLobbyBar: boolean;
  flestaRestaurant: boolean;
  hotelTransportService: boolean;
  laundryService: boolean;
  petsWelcome: boolean;
}
