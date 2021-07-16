import { Controller } from '@nestjs/common';
import { ArticleController } from '../article.controller';
import { SumService } from './sum.service';

@Controller('sum')
export class SumController extends ArticleController {
  constructor(protected readonly service: SumService) {
    super(service);
  }
}
