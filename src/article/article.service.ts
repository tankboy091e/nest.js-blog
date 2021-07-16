import { Injectable, NotFoundException } from '@nestjs/common';
import { Secretary } from 'src/secretary/secretary.service';
import { Repository } from 'typeorm';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article-dto';
import { ArticleEntity } from './entity/article.entity';

@Injectable()
abstract class ArticleService {
  constructor(
    protected readonly respository: Repository<ArticleEntity>,
    protected secretary: Secretary,
  ) {
    secretary.setContext(`${respository.metadata.name}Service`);
  }

  public async find(take?: number) {
    const result = await this.respository.find({
      order: {
        created_at: 'DESC',
      },
      take,
    });
    if (!result) {
      throw new NotFoundException();
    }
    this.secretary.log(
      `Successed to find ${take ? take : 'every'} resources from`,
    );
    return result;
  }

  public async findOne(id: number) {
    const result = await this.respository.findOne(id);
    if (!result) {
      throw new NotFoundException();
    }
    this.secretary.log(`Successed to find resource id: ${id} from`);
    return result;
  }

  public async create(data: CreateArticleDto) {
    const article = this.respository.create(data);
    const result = await this.respository.save(article);
    this.secretary.log('Successed to save a new resource into');
    return result;
  }

  public async update(id: number, data: UpdateArticleDto) {
    const article = await this.findOne(id);
    if (!article) {
      throw new NotFoundException();
    }
    const newone = {
      ...article,
      ...data,
    };
    const result = await this.respository.save(newone);
    this.secretary.log('Successed to update a resource in');
    return result;
  }

  public async delete(id: number) {
    const article = await this.findOne(id);
    if (!article) {
      throw new NotFoundException();
    }
    await this.respository.delete(id);
    this.secretary.log('Successed to delete a resource form');
    return null;
  }
}

export default ArticleService;
