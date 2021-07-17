import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { Role } from 'src/common/decorators/role.decorator';
import { CreateQuoteDto } from './dto/create-quote.dto';
import { UpdateQuoteDto } from './dto/update-quote.dto';
import { QuoteService } from './quote.service';

@Controller('quote')
export class QuoteController {
  constructor(private readonly service: QuoteService) {}

  @Get()
  public findAllByLibrary(@Query('library') library: number) {
    return this.service.findAllByLibrary(library);
  }

  @Get(':id')
  public findOne(@Param() id: number) {
    return this.service.findOne(id);
  }

  @Post()
  @Role('user')
  public create(@Body() data: CreateQuoteDto) {
    return this.service.create(data);
  }

  @Patch(':id')
  @Role('user')
  public update(@Param() id: number, @Body() data: UpdateQuoteDto) {
    return this.update(id, data);
  }

  @Delete(':id')
  @Role('user')
  public delete(@Param() id: number) {
    return this.delete(id);
  }
}
