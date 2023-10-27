import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { LoggerMiddleware } from './logger/logger.middleware';
import { CatsController } from './cats/cats.controller';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma.service';
import { PostService } from './post.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { DevtoolsModule } from '@nestjs/devtools-integration';

@Module({
  imports: [
    DevtoolsModule.register({ http: process.env.NODE_ENV !== 'production' }),
    CatsModule,
    ConfigModule.forRoot(),
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService, PostService, PrismaService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes(CatsController);
  }
}
