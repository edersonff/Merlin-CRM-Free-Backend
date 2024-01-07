import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  Query,
} from '@nestjs/common';
import { FilterService } from './filter.service';
import { CreateFilterDto } from './dto/create-filter.dto';
import { AuthRole } from 'src/auth/auth.guard';
import { UpdateFilterDto } from './dto/update-filter.dto';
import { ListNewEntities } from './dto/list-new.dto';

@Controller('filter')
@UseGuards(AuthRole(['proposal']))
export class FilterController {
  constructor(private readonly filterService: FilterService) {}

  @Post()
  create(
    @Body() { filter_type, is_valid: is_valid, url }: CreateFilterDto,
    @Req() { user },
  ) {
    return this.filterService
      .create({
        filter_type: filter_type.map((id) => ({ id })),
        is_valid,
        url,
        user: {
          id: user.id,
        },
      })
      .catch(() => {
        return { message: 'Filtro já existe' };
      });
  }

  @Get('new')
  findNew(@Query() query: ListNewEntities) {
    switch (query.site) {
      case '99freelas':
        return this.filterService.find99freelas(query);
      default:
        return [];
    }
  }

  @Get()
  findAll(@Req() { user }) {
    return this.filterService.findAll({
      where: {
        user: {
          id: user.id,
        },
      },
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.filterService.findOne({ where: { id: +id } });
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() { is_valid, url, filter_type }: UpdateFilterDto,
  ) {
    return this.filterService.update(+id, {
      is_valid,
      url,
      filter_type: filter_type.map((id) => ({ id })),
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.filterService.remove(+id);
  }
}
