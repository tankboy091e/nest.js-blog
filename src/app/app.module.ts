import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleModule } from 'src/article/article.module';
import { Dev } from 'src/article/dev/entities/dev.entity';
import { Essais } from 'src/article/essais/entities/essais.entity';
import { Sum } from 'src/article/sum/entities/sum.entity';
import { AuthModule } from 'src/auth/auth.module';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { Library } from 'src/library/entity/library.entity';
import { LibraryModule } from 'src/library/library.module';
import { User } from 'src/user/entity/user.entity';
import { UserModule } from '../user/user.module';

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
        entities: [User, Sum, Essais, Dev, Library],
        synchronize: true,
      }),
    }),
    ArticleModule,
    UserModule,
    AuthModule,
    LibraryModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
