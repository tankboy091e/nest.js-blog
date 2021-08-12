import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentModule } from 'src/comment/comment.module';
import { SecretaryModule } from 'src/secretary/secretary.module';
import { Sum } from './entities/sum.entity';
import { SumController } from './sum.controller';
import { SumService } from './sum.service';

@Module({
  imports: [TypeOrmModule.forFeature([Sum]), CommentModule, SecretaryModule],
  controllers: [SumController],
  providers: [SumService],
  exports: [SumService],
})
export class SumModule {}
