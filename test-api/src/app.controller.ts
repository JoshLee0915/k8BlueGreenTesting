import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  constructor() {}

  @Get('test')
  getTestRequest() {
    return {
      color: '#ffffff',
      version: '1.0'
    };
  }
}
