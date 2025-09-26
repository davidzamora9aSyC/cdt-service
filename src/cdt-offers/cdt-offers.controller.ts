import { Controller, Get, Param, Query } from '@nestjs/common';
import { CdtOffersService } from './cdt-offers.service';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { ListCdtOffersDto } from './dto/list-cdt-offers.dto';

@Controller('cdt/offers')
export class CdtOffersController {
  constructor(private readonly service: CdtOffersService) {}

  @Get()
  list(
    @Query() pagination: PaginationQueryDto,
    @Query() filters: ListCdtOffersDto,
  ) {
    return this.service.list(pagination, filters);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }
}
