import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '../users/entities/user.entities';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  auth(user: User) {
    const payload = { sub: user.id };

    return { access_token: this.jwtService.sign(payload) };
  }

  async validatePassword(username: string, password: string) {
    const user = await this.usersService.findByUsername(username);

    const isMatch = await bcrypt.compare(password, user.password);

    /* В идеальном случае пароль обязательно должен быть захэширован */
    if (user && isMatch) {
      /* Исключаем пароль из результата */
      const { password, ...result } = user;

      return result;
    }

    return null;
  }
}