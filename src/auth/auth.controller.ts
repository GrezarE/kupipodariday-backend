import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LocalGuard } from './guards/local.guards';

@Controller()
export class AuthController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @UseGuards(LocalGuard)
  @Post('signin')
  signin(@Request() req) {
    /* Генерируем для пользователя JWT токен */
    return this.authService.auth(req.user);
  }

  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto) {
    /* При регистрации, создаём пользователя и генерируем для него токен */
    const user = await this.usersService.create(createUserDto);

    return this.authService.auth(user);
    // return user
  }
}
