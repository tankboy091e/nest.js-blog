import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentModule } from 'src/comment/comment.module';
import { SecretaryModule } from 'src/secretary/secretary.module';
import { DevController } from './dev.controller';
import { DevService } from './dev.service';
import { Dev } from './entities/dev.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Dev]), CommentModule, SecretaryModule],
  controllers: [DevController],
  providers: [DevService],
  exports: [DevService],
})
export class DevModule {}
