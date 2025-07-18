import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResponseDto, LoginRequestDto, RegisterRequestDto } from './dto';
import type { Request, Response } from 'express';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Authorization, Authorized } from './decorators';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: 'Register user',
    description: 'Create new user account',
  })
  @ApiOkResponse({
    type: AuthResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Email or password is incorrect',
  })
  @ApiConflictResponse({
    description: 'Email already exists',
  })
  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  register(
    @Res({ passthrough: true }) res: Response,
    @Body() dto: RegisterRequestDto,
  ) {
    return this.authService.register(res, dto);
  }

  @ApiOperation({
    summary: 'Login user',
    description: 'Login user by email and password',
  })
  @ApiOkResponse({
    type: AuthResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Email or password is incorrect',
  })
  @ApiNotFoundResponse({
    description: 'User not found',
  })
  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(
    @Res({ passthrough: true }) res: Response,
    @Body() dto: LoginRequestDto,
  ) {
    return this.authService.login(res, dto);
  }

  @ApiOperation({
    summary: 'Refresh user token',
    description: 'Refresh user token',
  })
  @ApiOkResponse({
    type: AuthResponseDto,
  })
  @ApiUnauthorizedResponse({
    description: 'Refresh token is missing',
  })
  @HttpCode(HttpStatus.OK)
  @Post('refresh')
  refresh(@Res({ passthrough: true }) res: Response, @Req() req: Request) {
    return this.authService.refresh(req, res);
  }

  @ApiOperation({
    summary: 'Logout user',
    description: 'Logout user. Clear refresh token',
  })
  @HttpCode(HttpStatus.OK)
  @Post('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    return this.authService.logout(res);
  }

  @Authorization()
  @Get('me')
  @HttpCode(HttpStatus.OK)
  me(@Req() req: Request) {
    return req.user;
  }

  @Authorization()
  @Get('myname')
  @HttpCode(HttpStatus.OK)
  myname(@Authorized('name') name: string) {
    return name;
  }
}
