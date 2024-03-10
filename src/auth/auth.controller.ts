import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
import { SingInDto } from './dto/sing-in.dto';
import { AuthService } from './auth.service';
import { RefreshJwtGuard } from './guards/refresh-jwt-auth.guard';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { JwtGuard } from './guards/jwt-auth.guard';
import type { FastifyRequest } from 'fastify';
import type { UserDocument } from '../schemas/users.schema';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async singIn(@Body() signInDto: SingInDto) {
    return await this.authService.singIn(signInDto.email, signInDto.password);
  }

  @Post('register')
  async singUp(@Body() createUserDto: CreateUserDto) {
    return await this.authService.singUp(createUserDto);
  }

  @UseGuards(RefreshJwtGuard)
  @Post('refresh')
  async refreshToken(@Request() req: any) {
    return this.authService.refreshToken(req.user);
  }

  @UseGuards(JwtGuard)
  @Get('verify')
  async verifyToken(@Req() request: FastifyRequest & { user: UserDocument }) {
    return request.user;
  }
}
