import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersService } from '../users/users.service';
import { PrismaService } from '../prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { RefreshJwtStrategy } from './strategies/refreshToken.strategy';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UsersService,
    PrismaService,
    JwtStrategy,
    RefreshJwtStrategy,
  ],
})
export class AuthModule {}
