import * as mongoose from 'mongoose';
import { Model } from 'mongoose';
import { HotelDocumentInterface } from '../interfaces/hotel.interface';

export const HotelSchema = new mongoose.Schema<HotelDocumentInterface>(
  {
    hotelName: { type: String, required: true },
    rating: { type: Number, required: true },
    location: { type: String, required: true },
    reviews: { type: Number, required: true },
    images: { type: [String], required: true },
    description: { type: String, required: true },
    longitude: { type: Number, required: true },
    latitude: { type: Number, required: true },
    infoAtHotel: { type: String, required: true },
    roomAmenities: { type: String, required: true },
    postalCode: { type: Number, required: true },
    yearOfContusion: { type: Number, required: true },
    socketType: { type: String, required: true },
    totalRooms: { type: Number, required: true },
    serviceFee: { type: String, required: true },
    price: { type: Number, required: true },
    propertyType: {
      apartments: { type: Boolean, required: false },
      hotels: { type: Boolean, required: false },
      homestays: { type: Boolean, required: false },
      villas: { type: Boolean, required: false },
      motels: { type: Boolean, required: false },
    },
    facilities: {
      wakeUpCall: { type: Boolean, required: false },
      crHire: { type: Boolean, required: false },
      flatTv: { type: Boolean, required: false },
      dryCleaning: { type: Boolean, required: false },
      internet: { type: Boolean, required: false },
    },
    hotelService: {
      havanaLobbyBar: { type: Boolean, required: false },
      flestaRestaurant: { type: Boolean, required: false },
      hotelTransportService: { type: Boolean, required: false },
      laundryService: { type: Boolean, required: false },
      petsWelcome: { type: Boolean, required: false },
    },
    hotelRooms: [
      {
        image: { type: String, required: true },
        bedType: { type: String, required: true },
        facilities: {
          wakeUpCall: { type: Boolean, required: false },
          crHire: { type: Boolean, required: false },
          flatTv: { type: Boolean, required: false },
          dryCleaning: { type: Boolean, required: false },
          internet: { type: Boolean, required: false },
        },
        bedCount: { type: Number, required: true },
        guestsCount: { type: Number, required: true },
        price: { type: Number, required: true },
      },
    ],
  },
  { timestamps: true, versionKey: false },
);

export const HotelModel: Model<HotelDocumentInterface> =
  mongoose.model<HotelDocumentInterface>('HOTELS', HotelSchema);
