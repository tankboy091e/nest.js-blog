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

  public async findAllByLibrary(library: number) {
    const result = await this.repository.find({
      where: {
        library,
      },
      order: {
        page: 'ASC',
      },
    });

    const parsePage = ({ page }: Quote) => {
      if (page.includes('-')) {
        const [from, to] = page.trim().split('-');
        const integar = parseInt(from, 10);
        const demical = parseInt(to, 10) * Math.pow(10, -1 * to.length);
        return integar + demical;
      }
      return parseInt(page, 10);
    };

    return result.sort((a, b) => {
      const pageA = parsePage(a);
      const pageB = parsePage(b);

      if (pageA > pageB) {
        return 1;
      }
      if (pageA < pageB) {
        return -1;
      }
      return 0;
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
