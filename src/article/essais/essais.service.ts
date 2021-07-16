import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Secretary } from 'src/secretary/secretary.service';
import { Repository } from 'typeorm';
import ArticleService from '../article.service';
import { ArticleDto } from '../dto/article';
import { Essais } from './entities/essais.entity';

@Injectable()
export class EssaisService extends ArticleService<Essais, ArticleDto> {
  constructor(
    @InjectRepository(Essais)
    protected readonly respository: Repository<Essais>,
    protected secretary: Secretary,
  ) {
    super(respository, secretary);
  }
}
