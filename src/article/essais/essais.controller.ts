import { Controller } from '@nestjs/common';
import { ArticleController } from '../article.controller';
import { ArticleDto } from '../dto/article';
import { Essais } from './entities/essais.entity';
import { EssaisService } from './essais.service';

@Controller('essais')
export class EssaisController extends ArticleController<Essais, ArticleDto> {
  constructor(protected readonly service: EssaisService) {
    super(service);
  }
}
