import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProductModule } from './product/product.module';
import { LoggerMiddleware } from './logger/logger.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import Users from "./entities/user.entity";

@Module({
  imports: [
    UsersModule,
    ProductModule,
    TypeOrmModule.forRoot({
      type:"postgres",
      host:"localhost",
      port:5432,
      username:"postgres",
      password:"root",
      database:"nestjs",
      entities:[__dirname+'/**/*.entity{.ts,.js}'],
      synchronize:true
    }),
    TypeOrmModule.forFeature([Users]),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes("users");
    consumer.apply(LoggerMiddleware).forRoutes("product");
  }
}
