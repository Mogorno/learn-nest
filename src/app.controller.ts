import {
  Body,
  Controller,
  // Get,
  Post,
  // UseFilters,
  // UseGuards,
  // UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { AppService } from './app.service';
import { StringToLowercasePipe } from './shared/pipes';
// import { AuthGuard } from './shared/guards';
// import { UserAgent } from './shared/decorators';
// import { ResponseInterceptor } from './shared/interceptors';
// import { AllExceptionsFilter } from './shared/filters';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @UseGuards(AuthGuard)
  // @UseFilters(AllExceptionsFilter)
  // @UseInterceptors(ResponseInterceptor)
  // @Get(':me')
  // getProfile(@UserAgent() userAgent: string) {
  //   return this.appService.getProfile(userAgent);
  // }

  @UsePipes(StringToLowercasePipe)
  @Post()
  createProfile(@Body() dto: { name: string }) {
    return this.appService.createProfile(dto);
  }
}
