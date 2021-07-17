import { Controller } from '@nestjs/common';
import { CommentService } from 'src/comment/comment.service';
import { ArticleController } from '../article.controller';
import { DevService } from './dev.service';

@Controller('dev')
export class DevController extends ArticleController {
  constructor(
    protected readonly service: DevService,
    protected readonly commentService: CommentService,
  ) {
    super(service, commentService);
  }
}
