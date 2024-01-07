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
      host: 'ep-crimson-bonus-25963437.us-east-2.aws.neon.tech',
      port: 5432,
      username: 'edersonff',
      password: 'WB5GSpYd0QjA',
      entities: [User, Filter, FilterType],
      database: 'CRM',
      ssl: true,
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
