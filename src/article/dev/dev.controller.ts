import { Controller } from '@nestjs/common';
import { ArticleController } from '../article.controller';
import { Dev } from './entities/dev.entity';
import { DevService } from './dev.service';
import { ArticleDto } from '../dto/article';

@Controller('dev')
export class DevController extends ArticleController<Dev, ArticleDto> {
  constructor(protected readonly service: DevService) {
    super(service);
  }
}
