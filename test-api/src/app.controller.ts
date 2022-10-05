import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  constructor() {}

  @Get('test')
  getTestRequest() {
    return {
      color: '#0048ff',
      version: '1.0'
    };
  }
}
