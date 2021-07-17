import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { SecretaryModule } from 'src/secretary/secretary.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    JwtModule.register({}),
    UserModule,
    SecretaryModule,
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
