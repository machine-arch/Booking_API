import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('health')
  public async health(): Promise<any> {
    const healthy: boolean = await this.appService.health();

    if (!healthy) {
      throw new HttpException('ERROR', 500);
    }

    return { statusCode: HttpStatus.OK, message: 'OK' };
  }
}
