import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthRole } from 'src/auth/auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './user.service';

@Controller('user')
@UseGuards(AuthRole())
export class UsersController {
  constructor(private usersService: UsersService) {}

  @HttpCode(HttpStatus.CREATED)
  @Get(':id')
  findOne(@Request() req) {
    return this.usersService.findOne({
      where: {
        id: req.user.id,
      },
    });
  }

  @HttpCode(HttpStatus.CREATED)
  @Put('/')
  update(@Request() req, @Body() body: UpdateUserDto) {
    return this.usersService.update(req.user.id, body);
  }

  @HttpCode(HttpStatus.CREATED)
  @Delete('/')
  delete(@Request() req) {
    return this.usersService.remove(req.user.id);
  }
}
