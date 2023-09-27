import * as mongoose from 'mongoose';
import { Model } from 'mongoose';
import {
  HotelDocumentInterface,
  PropertyTypeInterface,
  FacilitiesInterface,
  HotelServiceInterface,
} from '../interfaces/hotel.interface';

// const PropertyTypeSchema = new mongoose.Schema<PropertyType>({
//   apartments: Boolean,
//   hotels: Boolean,
//   homestays: Boolean,
//   villas: Boolean,
//   motels: Boolean,
// });

// const FacilitiesSchema = new mongoose.Schema<Facilities>({
//   wakeUpCall: Boolean,
//   crHire: Boolean,
//   flatTv: Boolean,
//   dryCleaning: Boolean,
//   internet: Boolean,
// });

// const HotelServiceSchema = new mongoose.Schema<HotelService>({
//   havanaLobbyBar: Boolean,
//   flestaRestaurant: Boolean,
//   hotelTransportService: Boolean,
//   laundryService: Boolean,
//   petsWelcome: Boolean,
// });

export const HotelSchema = new mongoose.Schema<HotelDocumentInterface>({
  hotelName: String,
  rating: Number,
  location: String,
  reviews: Number,
  images: [String],
  description: String,
  longitude: Number,
  latitude: Number,
  infoAtHotel: String,
  roomAmenities: String,
  postalCode: Number,
  yearOfContusion: Number,
  socketType: String,
  totalRooms: Number,
  serviceFee: String,
  price: Number,
  propertyType: {
    apartments: Boolean,
    hotels: Boolean,
    homestays: Boolean,
    villas: Boolean,
    motels: Boolean,
  },
  facilities: {
    wakeUpCall: Boolean,
    crHire: Boolean,
    flatTv: Boolean,
    dryCleaning: Boolean,
    internet: Boolean,
  },
  hotelService: {
    havanaLobbyBar: Boolean,
    flestaRestaurant: Boolean,
    hotelTransportService: Boolean,
    laundryService: Boolean,
    petsWelcome: Boolean,
  },
});

export const HotelModel: Model<HotelDocumentInterface> =
  mongoose.model<HotelDocumentInterface>('HOTELS', HotelSchema);
