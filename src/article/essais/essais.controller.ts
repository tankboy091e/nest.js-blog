import { Controller } from '@nestjs/common';
import { CommentService } from 'src/comment/comment.service';
import { ArticleController } from '../article.controller';
import { EssaisService } from './essais.service';

@Controller('essais')
export class EssaisController extends ArticleController {
  constructor(
    protected readonly service: EssaisService,
    protected readonly commentService: CommentService,
  ) {
    super(service, commentService);
  }
}
