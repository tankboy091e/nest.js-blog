import { Module } from '@nestjs/common';
import { SumModule } from './sum/sum.module';
import { EssaisModule } from './essais/essais.module';
import { DevModule } from './dev/dev.module';

@Module({
  imports: [SumModule, EssaisModule, DevModule],
})
export class ArticleModule {}
