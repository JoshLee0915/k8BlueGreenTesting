import {Controller, Get, HttpException, HttpStatus} from '@nestjs/common';

@Controller()
export class AppController {
  constructor() {}

  @Get('test')
  getTestRequest() {
    const color = process.env.color ?? '#ffffff'
    const version = process.env.version ?? '0.0'
    const flaky = Number(process.env.flakiness) ?? 0.0

    if(Math.random() < flaky)
      throw new HttpException('OH NO I BECAME A TEAPOT!', HttpStatus.I_AM_A_TEAPOT)

    return {
      color: color,
      version: version
    };
  }
}
