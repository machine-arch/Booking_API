import * as mongoose from 'mongoose';
import { Model } from 'mongoose';
import { HotelDocumentInterface } from '../interfaces/hotel.interface';

export const HotelSchema = new mongoose.Schema<HotelDocumentInterface>(
  {
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
  },
  { timestamps: true, versionKey: false },
);

export const HotelModel: Model<HotelDocumentInterface> =
  mongoose.model<HotelDocumentInterface>('HOTELS', HotelSchema);
