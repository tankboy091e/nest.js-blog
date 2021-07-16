import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Secretary } from 'src/secretary/secretary.service';
import { Repository } from 'typeorm';
import ArticleService from '../article.service';
import { ArticleDto } from '../dto/article';
import { Sum } from './entities/sum.entity';

@Injectable()
export class SumService extends ArticleService<Sum, ArticleDto> {
  constructor(
    @InjectRepository(Sum)
    protected readonly respository: Repository<Sum>,
    protected secretary: Secretary,
  ) {
    super(respository, secretary);
  }
}
