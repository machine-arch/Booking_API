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
    image: { type: String, required: false },
    bedType: { type: String, required: false },
    roomType: { type: String, required: false },
    metaData: { type: String, required: false },
    facilities: FacilitiSchema,
    bedsCount: { type: Number, required: false },
    adultsCount: { type: Number, required: false },
    childrensCount: { type: Number, required: false },
    price: { type: Number, required: false },
    bookedDates: [BookedDatesSchema],
  },
  { _id: false },
);

export const HotelSchema = new mongoose.Schema<HotelDocumentInterface>(
  {
    hotelName: { type: String, required: false },
    rating: { type: Number, required: false },
    location: { type: String, required: false },
    reviews: { type: Number, required: false },
    images: { type: [String], required: false },
    metadata: { type: String, required: false },
    description: { type: String, required: false },
    longitude: { type: Number, required: false },
    latitude: { type: Number, required: false },
    infoAtHotel: { type: String, required: false },
    roomAmenities: { type: String, required: false },
    postalCode: { type: Number, required: false },
    yearOfContusion: { type: Number, required: false },
    socketType: { type: String, required: false },
    totalRooms: { type: Number, required: false },
    serviceFee: { type: String, required: false },
    price: { type: Number, required: false },
    propertyType: PropertyTypeSchema,
    facilities: FacilitiSchema,
    hotelService: HotelServiceSchema,
    hotelRooms: [HotelRoomSchema],
  },
  { timestamps: true, versionKey: false },
);

export const HotelModel: Model<HotelDocumentInterface> =
  mongoose.model<HotelDocumentInterface>('HOTELS', HotelSchema);
