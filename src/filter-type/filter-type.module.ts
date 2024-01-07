import { Module } from '@nestjs/common';
import { FilterTypeService } from './filter-type.service';
import { FilterTypeController } from './filter-type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilterType } from './entities/filter-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FilterType])],
  controllers: [FilterTypeController],
  providers: [FilterTypeService],
})
export class FilterTypeModule {}
