import { Controller } from '@nestjs/common';
import { ArticleController } from '../article.controller';
import { ArticleDto } from '../dto/article';
import { Sum } from './entities/sum.entity';
import { SumService } from './sum.service';

@Controller('sum')
export class SumController extends ArticleController<Sum, ArticleDto> {
  constructor(protected readonly service: SumService) {
    super(service);
  }
}
