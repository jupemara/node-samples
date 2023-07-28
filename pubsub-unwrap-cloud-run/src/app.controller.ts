import { Controller, Get, Post, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  public unwrapTest(@Req() req: Request): void {
    console.log(`body:`, req.body);
    console.log(`headers:`, req.headers);
    return;
  }
}
