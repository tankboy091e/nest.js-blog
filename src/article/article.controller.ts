import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Role } from 'src/common/decorators/role.decorator';
import ArticleService from './article.service';

@Controller()
export class ArticleController<T, K> {
  constructor(protected readonly service: ArticleService<T, K>) {}

  @Get()
  getAll() {
    return this.service.findAll();
  }

  @Get('/:id')
  getOne(@Param('id') id: number) {
    return this.service.findOne(id);
  }

  @Post()
  @Role('user')
  create(@Body() data: K) {
    return this.service.create(data);
  }

  @Patch('/:id')
  @Role('user')
  update(@Param('id') id: number, @Body() data: K) {
    return this.service.update(id, data);
  }

  @Delete('/:id')
  @Role('user')
  @HttpCode(204)
  delete(@Param('id') id: number) {
    return this.service.delete(id);
  }
}
