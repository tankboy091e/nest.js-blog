import { Controller } from '@nestjs/common';
import { ArticleController } from '../article.controller';
import { EssaisService } from './essais.service';

@Controller('essais')
export class EssaisController extends ArticleController {
  constructor(protected readonly service: EssaisService) {
    super(service);
  }
}
