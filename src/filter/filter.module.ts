import { Module } from '@nestjs/common';
import { FilterService } from './filter.service';
import { FilterController } from './filter.controller';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Filter } from './entities/filter.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Filter]), HttpModule],
  controllers: [FilterController],
  providers: [FilterService],
})
export class FilterModule {}
