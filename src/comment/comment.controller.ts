import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { ValidateCommentDto } from './dto/validate-comment.dto ';

@Controller('comment')
export class CommentController {
  constructor(private readonly service: CommentService) {}

  @Get()
  public findAllByArticleId(@Query('article') article: number) {
    return this.service.findAllByArticleId(article);
  }

  @Post()
  public create(@Body() data: CreateCommentDto) {
    return this.service.create(data);
  }

  @Put(':id')
  public update(@Param() id: number, @Body() data: UpdateCommentDto) {
    return this.service.update(id, data);
  }

  @Delete(':id')
  @HttpCode(204)
  public async delete(@Param() id: number) {
    await this.service.delete(id);
    return null;
  }

  @Post('validate')
  @HttpCode(204)
  public validate(@Body() data: ValidateCommentDto) {
    return this.service.validate(data);
  }
}
