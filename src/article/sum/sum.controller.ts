import { Controller } from '@nestjs/common';
import { CommentService } from 'src/comment/comment.service';
import { ArticleController } from '../article.controller';
import { SumService } from './sum.service';

@Controller('sum')
export class SumController extends ArticleController {
  constructor(
    protected readonly service: SumService,
    protected readonly commentService: CommentService,
  ) {
    super(service, commentService);
  }
}
