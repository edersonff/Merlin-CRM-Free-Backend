import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { UsersModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { FilterModule } from './filter/filter.module';
import { FilterTypeModule } from './filter-type/filter-type.module';
import { Filter } from './filter/entities/filter.entity';
import { FilterType } from './filter-type/entities/filter-type.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      entities: [User, Filter, FilterType],
      database: 'crm',
      synchronize: true,
      logging: true,
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    UsersModule,
    AuthModule,
    FilterModule,
    FilterTypeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
