import {
  Controller,
  Get,
  Req,
  UseGuards,
  Body,
  Patch,
  Param,
  Post,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UsersService } from './users.service';
import { PatchUserDto } from './dto/patch-user.dto';
import { FindUserDto } from './dto/find-user.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getMe(@Req() req) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Patch('me')
  async patchMe(@Req() req, @Body() patchUserDto: PatchUserDto) {
    return this.usersService.updateOne(req.user.id, patchUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me/wishes')
  async getWishes(@Req() req) {
    const wishes = await this.usersService.getWishes(req.user.username);
    return wishes;
  }

  @UseGuards(JwtAuthGuard)
  @Get(':username')
  async getUserByUsername(@Param('username') username: any) {
    const user = await this.usersService.findMany(username);
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Get(':username/wishes')
  async getWishesByUsername(@Param('username') username: string) {
    const wishes = await this.usersService.getWishes(username);
    return wishes;
  }

  @UseGuards(JwtAuthGuard)
  @Post('find')
  async findUser(@Body() findUserDto: FindUserDto) {
    console.log(findUserDto);
    const user = await this.usersService.findMany(findUserDto.query);
    return user;
  }
}
