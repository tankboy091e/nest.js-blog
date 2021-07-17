import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentModule } from 'src/comment/comment.module';
import { SecretaryModule } from 'src/secretary/secretary.module';
import { Essais } from './entities/essais.entity';
import { EssaisController } from './essais.controller';
import { EssaisService } from './essais.service';

@Module({
  imports: [TypeOrmModule.forFeature([Essais]), CommentModule, SecretaryModule],
  controllers: [EssaisController],
  providers: [EssaisService],
  exports: [EssaisService],
})
export class EssaisModule {}
