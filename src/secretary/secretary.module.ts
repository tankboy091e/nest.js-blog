import { Module } from '@nestjs/common';
import { Secretary } from './secretary.service';

@Module({
  providers: [Secretary],
  exports: [Secretary],
})
export class SecretaryModule {}
