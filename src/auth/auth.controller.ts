import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { SingInDto } from './dto/sing-in.dto';
import { AuthService } from './auth.service';
import { RefreshJwtGuard } from './guards/refresh-jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() signInDto: SingInDto) {
    return await this.authService.singIn(signInDto.email, signInDto.password);
  }

  @UseGuards(RefreshJwtGuard)
  @Post('refresh')
  async refreshToken(@Request() req: any) {
    return this.authService.refreshToken(req.user);
  }
}
