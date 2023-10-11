import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { SeederService } from './seeder.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('v1/seeder')
export class SeederController {
  constructor(private readonly seederService: SeederService) {}

  @Post('/upload')
  @UseInterceptors(FileInterceptor('file'))
  public async uploadExcel(@UploadedFile() file: any) {
    return await this.seederService.uploadExcel(file);
  }
}
