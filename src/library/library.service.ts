import { HttpService, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLibraryDto } from './dto/create-library.dto';
import { Library } from './entity/library.entity';

@Injectable()
export class LibraryService {
  constructor(
    @InjectRepository(Library)
    private readonly repository: Repository<Library>,
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  public find(take?: number) {
    return this.repository.find({
      order: {
        created_at: 'DESC',
      },
      take,
    });
  }

  public findOne(id: number) {
    return this.repository.findOne(id);
  }

  public create(data: CreateLibraryDto) {
    const library = this.repository.create(data);
    return this.repository.save(library);
  }

  public async fetchBookData(isbn: string): Promise<CreateLibraryDto> {
    const idType = isbn.length < 13 ? 'isbn' : 'isbn13';

    const res = await this.httpService
      .get(
        `https://www.aladin.co.kr/ttb/api/ItemLookUp.aspx?ttbkey=${this.configService.get(
          'ALADIN_KEY',
        )}&itemIdType=${idType}&cover=big&ItemId=${isbn}&output=JS&Version=20131101`,
      )
      .toPromise();

    if (res.status !== 200) {
      throw new NotFoundException({
        message: "The given isbn doesn't match any books in aladin",
      });
    }

    const { data } = res;

    if (data.errorCode) {
      throw new NotFoundException({
        message: data.errorMessage,
      });
    }

    const { item } = data;

    const { title, author, pubDate, publisher, cover, link, subInfo } = item[0];

    const { itemPage } = subInfo;

    return {
      isbn,
      title,
      author,
      pubDate,
      publisher,
      cover,
      link,
      page: itemPage,
    };
  }

  public async searchInLibrary(value: string) {
    const books = await this.find();
    const result = books.find((book) => book.title.includes(value));
    if (!result) {
      throw new NotFoundException();
    }
    return result;
  }

  public async searchInAladin(value: string) {
    const res = await this.httpService
      .get(
        `https://www.aladin.co.kr/ttb/api/ItemSearch.aspx?ttbkey=${this.configService.get(
          'ALADIN_KEY',
        )}&Query=${encodeURI(
          value,
        )}&MaxResults=10&start=1&cover=big&output=JS&Version=20131101`,
      )
      .toPromise();

    if (res.status !== 200) {
      throw new NotFoundException();
    }

    const { data } = res;

    return data;
  }

  public deleteAll() {
    return this.repository
      .createQueryBuilder()
      .delete()
      .from(Library)
      .execute();
  }
}
