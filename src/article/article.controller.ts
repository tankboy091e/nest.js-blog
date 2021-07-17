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
import { CommentService } from 'src/comment/comment.service';
import { Role } from 'src/common/decorators/role.decorator';
import ArticleService from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article-dto';

@Controller()
export class ArticleController {
  constructor(
    protected readonly service: ArticleService,
    protected readonly commentService: CommentService,
  ) {}

  @Get()
  public getAll() {
    return this.service.find();
  }

  @Get('/:id')
  public async getOne(@Param('id') id: number) {
    const article = await this.service.findOne(id);
    const comments = await this.commentService.findAllByArticleId(id);
    return {
      article,
      comments,
    };
  }

  @Post()
  @Role('user')
  public create(@Body() data: CreateArticleDto) {
    return this.service.create(data);
  }

  @Patch('/:id')
  @Role('user')
  public update(@Param('id') id: number, @Body() data: UpdateArticleDto) {
    return this.service.update(id, data);
  }

  @Delete('/:id')
  @Role('user')
  @HttpCode(204)
  public delete(@Param('id') id: number) {
    return this.service.delete(id);
  }
}
