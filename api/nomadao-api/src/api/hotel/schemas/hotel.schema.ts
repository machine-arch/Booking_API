import * as mongoose from 'mongoose';
import { Model } from 'mongoose';
import {
  FacilitiesInterface,
  HotelDocumentInterface,
  HotelRoomsInterface,
  HotelServiceInterface,
  PropertyTypeInterface,
} from '../interfaces/hotel.interface';

const BookedDatesSchema = new mongoose.Schema(
  {
    startDate: Date,
    endDate: Date,
  },
  { _id: false },
);

const PropertyTypeSchema = new mongoose.Schema<PropertyTypeInterface>(
  {
    apartments: { type: Boolean, required: false },
    hotels: { type: Boolean, required: false },
    homestays: { type: Boolean, required: false },
    villas: { type: Boolean, required: false },
    motels: { type: Boolean, required: false },
  },
  { _id: false },
);

const FacilitiSchema = new mongoose.Schema<FacilitiesInterface>(
  {
    wakeUpCall: { type: Boolean, required: false },
    crHire: { type: Boolean, required: false },
    flatTv: { type: Boolean, required: false },
    dryCleaning: { type: Boolean, required: false },
    internet: { type: Boolean, required: false },
  },
  { _id: false },
);

const HotelServiceSchema = new mongoose.Schema<HotelServiceInterface>(
  {
    havanaLobbyBar: { type: Boolean, required: false },
    flestaRestaurant: { type: Boolean, required: false },
    hotelTransportService: { type: Boolean, required: false },
    laundryService: { type: Boolean, required: false },
    petsWelcome: { type: Boolean, required: false },
  },
  { _id: false },
);

const HotelRoomSchema = new mongoose.Schema<HotelRoomsInterface>(
  {
    image: { type: String, required: true },
    bedType: { type: String, required: true },
    roomType: { type: String, required: true },
    metaData: { type: String, required: false },
    facilities: FacilitiSchema,
    bedsCount: { type: Number, required: true },
    adultsCount: { type: Number, required: true },
    childrensCount: { type: Number, required: true },
    price: { type: Number, required: true },
    bookedDates: [BookedDatesSchema],
  },
  { _id: false },
);

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
    propertyType: PropertyTypeSchema,
    facilities: FacilitiSchema,
    hotelService: HotelServiceSchema,
    hotelRooms: [HotelRoomSchema],
  },
  { timestamps: true, versionKey: false },
);

export const HotelModel: Model<HotelDocumentInterface> =
  mongoose.model<HotelDocumentInterface>('HOTELS', HotelSchema);
