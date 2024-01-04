import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { compareSync } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import type { CreateUserDto } from '../users/dto/create-user.dto';

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
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      access_token: this.jwtService.sign({ id: user.id }),
      refresh_token: this.jwtService.sign({ id: user.id }, { expiresIn: '7d' }),
    };
  }

  async singUp(user: CreateUserDto) {
    const userCreated = await this.usersService.create(user);

    return {
      user: {
        id: userCreated.id,
        email: userCreated.email,
        name: userCreated.name,
      },
      access_token: this.jwtService.sign({ id: userCreated.id }),
      refresh_token: this.jwtService.sign(
        { id: userCreated.id },
        { expiresIn: '7d' },
      ),
    };
  }

  refreshToken(user: any) {
    return {
      access_token: this.jwtService.sign({ id: user.id }),
    };
  }
}
