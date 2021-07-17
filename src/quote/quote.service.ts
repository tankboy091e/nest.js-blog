import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateQuoteDto } from './dto/create-quote.dto';
import { UpdateQuoteDto } from './dto/update-quote.dto';
import { Quote } from './entity/quote.entity';

@Injectable()
export class QuoteService {
  constructor(
    @InjectRepository(Quote)
    private readonly repository: Repository<Quote>,
  ) {}

  public findOne(id: number) {
    return this.repository.findOne(id);
  }

  public findAllByLibrary(library: number) {
    return this.repository.find({
      where: {
        library,
      },
      order: {
        page: 'ASC',
      },
    });
  }

  public create(data: CreateQuoteDto) {
    const quote = this.repository.create(data);
    return this.repository.save(quote);
  }

  public async update(id: number, data: UpdateQuoteDto) {
    const quote = await this.findOne(id);
    if (!quote) {
      throw new NotFoundException();
    }
    const updated = this.repository.create({
      ...quote,
      ...data,
    });
    return this.repository.save(updated);
  }

  public delete(id: number) {
    return this.repository.delete(id);
  }
}
