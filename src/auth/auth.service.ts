import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { compareSync } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async singIn(email: string, password: string) {
    const user = await this.usersService.findOneByEmail(email);
    if (!user) {
      throw new UnauthorizedException();
    }

    if (!compareSync(password, user.password)) {
      throw new UnauthorizedException();
    }

    return {
      access_token: this.jwtService.sign({ id: user.id }),
      refresh_token: this.jwtService.sign({ id: user.id }, { expiresIn: '7d' }),
    };
  }

  async refreshToken(user: any) {
    return {
      access_token: this.jwtService.sign({ id: user.id }),
    };
  }
}
