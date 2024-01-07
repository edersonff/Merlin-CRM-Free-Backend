import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { DefaultService } from 'src/resource/default.service';
import { FilterType } from './entities/filter-type.entity';

@Injectable()
export class FilterTypeService extends DefaultService<FilterType> {
  constructor(
    @InjectRepository(FilterType)
    protected repository: Repository<FilterType>,
  ) {
    super(repository);
  }
}
