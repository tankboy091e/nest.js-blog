import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { LibraryService } from './library.service';

@Controller('library')
export class LibraryController {
  constructor(private readonly service: LibraryService) {}

  @Get()
  public findAll() {
    return this.service.find();
  }

  @Get('search')
  public search(@Query('value') value: string, @Query('from') from: string) {
    switch (from) {
      case 'library':
        return this.service.searchInLibrary(value);
      default:
        return this.service.searchInAladin(value);
    }
  }

  @Get(':id')
  public findOne(@Param() id: number) {
    return this.service.findOne(id);
  }

  @Post()
  public async create(@Body() { isbn }: { isbn: string }) {
    const data = await this.service.fetchBookData(isbn);
    return this.service.create(data);
  }

  @Delete()
  public deleteAll() {
    return this.service.deleteAll();
  }
}
