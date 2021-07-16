import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Secretary } from 'src/secretary/secretary.service';
import { Repository } from 'typeorm';
import ArticleService from '../article.service';
import { Essais } from './entities/essais.entity';

@Injectable()
export class EssaisService extends ArticleService {
  constructor(
    @InjectRepository(Essais)
    protected readonly respository: Repository<Essais>,
    protected secretary: Secretary,
  ) {
    super(respository, secretary);
  }
}
