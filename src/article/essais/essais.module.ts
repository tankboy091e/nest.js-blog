import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SecretaryModule } from 'src/secretary/secretary.module';
import { Essais } from './entities/essais.entity';
import { EssaisController } from './essais.controller';
import { EssaisService } from './essais.service';

@Module({
  imports: [TypeOrmModule.forFeature([Essais]), SecretaryModule],
  controllers: [EssaisController],
  providers: [EssaisService],
  exports: [EssaisService],
})
export class EssaisModule {}
