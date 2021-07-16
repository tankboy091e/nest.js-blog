import { Module } from '@nestjs/common';
import { SumController } from './sum/sum.controller';
import { DevController } from './dev/dev.controller';
import { EssaisController } from './essais/essais.controller';
import { SumService } from './sum/sum.service';
import { DevService } from './dev/dev.service';
import { EssaisService } from './essais/essais.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sum } from './sum/entities/sum.entity';
import { Dev } from './dev/entities/dev.entity';
import { Essais } from './essais/entities/essais.entity';
import { SecretaryModule } from 'src/secretary/secretary.module';

@Module({
  imports: [TypeOrmModule.forFeature([Sum, Dev, Essais]), SecretaryModule],
  controllers: [SumController, DevController, EssaisController],
  providers: [SumService, DevService, EssaisService],
})
export class ArticleModule {}
