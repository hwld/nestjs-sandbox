import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    throw new HttpException(
      { code: 1, message: 'a' },
      HttpStatus.INTERNAL_SERVER_ERROR,
      { cause: new Error('eee') },
    );
    return this.appService.getHello();
  }
}
