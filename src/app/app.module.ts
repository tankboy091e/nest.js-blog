import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DevModule } from 'src/article/dev/dev.module';
import { Dev } from 'src/article/dev/entities/dev.entity';
import { Essais } from 'src/article/essais/entities/essais.entity';
import { EssaisModule } from 'src/article/essais/essais.module';
import { Sum } from 'src/article/sum/entities/sum.entity';
import { SumModule } from 'src/article/sum/sum.module';
import { AuthModule } from 'src/auth/auth.module';
import { CommentModule } from 'src/comments/comment.module';
import { Comment } from 'src/comments/entity/comment.entity';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { Library } from 'src/library/entity/library.entity';
import { LibraryModule } from 'src/library/library.module';
import { User } from 'src/user/entity/user.entity';
import { UserModule } from '../user/user.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'mysql',
        host: process.env.DATABASE_HOST,
        port: parseInt(process.env.DATABASE_PORT, 10),
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        entities: [User, Sum, Essais, Dev, Library, Comment],
        synchronize: true,
      }),
    }),
    UserModule,
    AuthModule,
    SumModule,
    EssaisModule,
    DevModule,
    LibraryModule,
    CommentModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
