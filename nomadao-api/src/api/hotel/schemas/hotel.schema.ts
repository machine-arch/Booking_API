import * as mongoose from 'mongoose';
import { Model, Schema } from 'mongoose';
import { HotelDocumentInterface } from '../interfaces/hotel.interface';

export const HotelSchema: Schema<HotelDocumentInterface> = new mongoose.Schema(
  {
    hotelName: { type: String, required: false },
    rating: { type: Number, required: false },
    location: { type: String, rquired: false },
    reviews: { type: Number, required: false },
    images: { type: [String], quired: false },
    description: { type: String, required: false },
    longitude: { type: Number, required: false },
    latitude: { type: Number, required: false },
    infoAtHotel: { type: [String], required: false },
    roomAmenities: { type: [String], required: false },
    postalCode: { type: Number, required: false },
    yearOfContusion: { type: Number, required: false },
    socketType: { type: String, required: false },
    totalRooms: { type: Number, required: false },
    serviceFee: { type: String, required: false },
    price: { type: Number, required: false },
    apartments: { type: Boolean, required: false },
    hotels: { type: Boolean, required: false },
    homestays: { type: Boolean, required: false },
    villas: { type: Boolean, required: false },
    motels: { type: Boolean, required: false },
    wakeUpCall: { type: Boolean, required: false },
    crHire: { type: Boolean, required: false },
    flatTv: { type: Boolean, required: false },
    dryCleaning: { type: Boolean, required: false },
    internet: { type: Boolean, required: false },
    havanaLobbyBar: { type: Boolean, required: false },
    flestaRestaurant: { type: Boolean, required: false },
    hotelTransportService: { type: Boolean, required: false },
    laundryService: { type: Boolean, required: false },
    petsWelcome: { type: Boolean, required: false },
  },
  { timestamps: true, versionKey: false },
);
export const HotelModel: Model<HotelDocumentInterface> =
  mongoose.model<HotelDocumentInterface>('HOTELS', HotelSchema);
