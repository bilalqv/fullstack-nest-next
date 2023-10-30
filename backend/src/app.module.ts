import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users/user.model';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';


@Module({
  imports: [AuthModule, ConfigModule.forRoot(),
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'user1',
      password: '9876@sql',
      database: 'nest_next_fullstack_1',
      models: [User],
      autoLoadModels: true,
      synchronize: true,
    }),
    UsersModule
  ],
  controllers: [AppController],
  providers: [AppService, UsersService],
})
export class AppModule { }
