import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RegisterUserDto } from './dto/register_user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Get('/:id')
  findOne(@Param('id') id: number) {
    return this.service.findOne(id);
  }

  @Post()
  create(@Body() body: RegisterUserDto) {
    return this.service.create(body);
  }
}
