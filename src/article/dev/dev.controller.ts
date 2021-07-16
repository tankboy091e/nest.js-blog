import { Controller } from '@nestjs/common';
import { ArticleController } from '../article.controller';
import { DevService } from './dev.service';

@Controller('dev')
export class DevController extends ArticleController {
  constructor(protected readonly service: DevService) {
    super(service);
  }
}
