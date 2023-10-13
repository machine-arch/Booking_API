import { Injectable } from '@nestjs/common';
import * as ExcelJS from 'exceljs';
import { HotelService } from 'src/api/hotel/hotel.service';

@Injectable()
export class SeederService {
  constructor(private readonly hotelService: HotelService) {}

  public async uploadExcel(file: any) {
    try {
      const workbook = new ExcelJS.Workbook();
      const buffer = file.buffer;

      await workbook.xlsx.load(buffer);

      const worksheet = workbook.getWorksheet(1);
      const jsonData = [];

      worksheet.eachRow((row) => {
        function splitCellValueByNewlines(cellValue) {
          if (!cellValue) return [];
          return cellValue.split('\n').map((line) => line.split(' ')[0]);
        }

        function arrayToObj(array) {
          const obj = {};
          array.forEach((item: any) => {
            obj[item] = true;
          });
          return obj;
        }

        const rowData = {
          hotelName: row.getCell(1).value,
          rating: row.getCell(4).value,
          location: row.getCell(2).value,
          reviews: 0,
          images: [row.getCell(11).value, row.getCell(12).value],
          description: row.getCell(5).value,
          longitude: row.getCell(7).value,
          latitude: row.getCell(6).value,
          infoAtHotel: '',
          roomAmenities: '',
          postalCode: row.getCell(3).value,
          yearOfContusion: 0,
          socketType: '',
          totalRooms: 0,
          serviceFee: '',
          price: row.getCell(9).value,
          metadata: row.getCell(8).value,
          propertyType: { hotels: true },
          //   facilities: arrayToObj(
          //     splitCellValueByNewlines(row.getCell(11).value),
          //   ),
          facilities: {
            wakeUpCall: true,
            crHire: true,
            flatTv: true,
            dryCleaning: true,
            internet: true,
          },
          //   hotelServices: arrayToObj(
          //     splitCellValueByNewlines(row.getCell(12).value),
          //   ),
          HotelServiceInterface: {
            havanaLobbyBar: true,
            flestaRestaurant: true,
            hotelTransportService: true,
            laundryService: true,
            petsWelcome: true,
          },
          hotelRooms: [
            {
              image:
                row.getCell(16).value === null || row.getCell(16).value === ''
                  ? 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/21299833.jpg?k=d918b33e0a10e8fbd3a9edcb3c922ed20243bf2ed46e3798811005c48e29ccf4&o=&hp=1'
                  : row.getCell(16).value,
              bedType: '',
              roomType: '',
              metaData: '',
              facilities: arrayToObj(
                splitCellValueByNewlines(row.getCell(11).value),
              ),
              bedsCount: 0,
              adultsCount: 0,
              childrensCount: 0,
              price: row.getCell(9).value,
              bookedDates: [],
            },
          ],
        };

        jsonData.push(rowData);
      });

      jsonData.slice(1).forEach((hotel) => {
        this.hotelService.create(hotel).then();
      });

      return { statusCode: 201, message: 'CREATED' };
    } catch (error) {
      throw new Error('Error parsing Excel file');
    }
  }
}
