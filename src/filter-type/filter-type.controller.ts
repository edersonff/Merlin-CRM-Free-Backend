import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { FilterTypeService } from './filter-type.service';
import { CreateFilterTypeDto } from './dto/create-filter-type.dto';
import { AuthRole } from 'src/auth/auth.guard';

@Controller('filter-type')
@UseGuards(AuthRole(['manager']))
export class FilterTypeController {
  constructor(private readonly filterTypeService: FilterTypeService) {}

  @Post()
  create(@Body() createFilterTypeDto: CreateFilterTypeDto) {
    return this.filterTypeService.create(createFilterTypeDto);
  }

  @Get()
  findAll() {
    return this.filterTypeService.findAll();
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.filterTypeService.remove(+id);
  }
}
