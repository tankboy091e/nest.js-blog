import { Injectable } from '@nestjs/common';
import { DevService } from 'src/article/dev/dev.service';
import { EssaisService } from 'src/article/essais/essais.service';
import { SumService } from 'src/article/sum/sum.service';
import { LibraryService } from 'src/library/library.service';

@Injectable()
export class AppService {
  constructor(
    private readonly sumServcie: SumService,
    private readonly essaisService: EssaisService,
    private readonly devService: DevService,
    private readonly libraryService: LibraryService,
  ) {}

  public hello() {
    return 'hello';
  }

  public getSum() {
    return this.sumServcie.find(10);
  }

  public getEssais() {
    return this.essaisService.find(10);
  }

  public getDev() {
    return this.devService.find(10);
  }

  public getLibrary() {
    return this.libraryService.choose(5);
  }
}
