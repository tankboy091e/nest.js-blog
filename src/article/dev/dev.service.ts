import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Secretary } from 'src/secretary/secretary.service';
import { Repository } from 'typeorm';
import ArticleService from '../article.service';
import { ArticleDto } from '../dto/article';
import { Dev } from './entities/dev.entity';

@Injectable()
export class DevService extends ArticleService<Dev, ArticleDto> {
  constructor(
    @InjectRepository(Dev)
    protected readonly respository: Repository<Dev>,
    protected secretary: Secretary,
  ) {
    super(respository, secretary);
  }
}
