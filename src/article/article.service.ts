import { Injectable, NotFoundException } from '@nestjs/common';
import { Secretary } from 'src/secretary/secretary.service';
import { Repository } from 'typeorm';

@Injectable()
abstract class ArticleService<T, K> {
  constructor(
    protected readonly respository: Repository<T>,
    protected secretary: Secretary,
  ) {
    secretary.setContext(`${respository.metadata.name}Service`);
  }

  async findAll(): Promise<T[]> {
    const result = await this.respository.find();
    if (!result) {
      throw new NotFoundException();
    }
    this.secretary.log('Successed to find all resources from');
    return result;
  }

  async findOne(id: number): Promise<T> {
    const result = await this.respository.findOne(id);
    if (!result) {
      throw new NotFoundException();
    }
    this.secretary.log(`Successed to find resource id: ${id} from`);
    return result;
  }

  async create(data: K): Promise<T> {
    const article = this.respository.create(data);
    const result = await this.respository.save(article);
    this.secretary.log('Successed to save a new resource into');
    return result;
  }

  async update(id: number, data: K): Promise<T & K> {
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

  async delete(id: number): Promise<any> {
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