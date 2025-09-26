import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CdtContractsService } from './cdt-contracts.service';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { ListCdtContractsDto } from './dto/list-cdt-contracts.dto';
import { CreateCdtContractDto } from './dto/create-cdt-contract.dto';

@Controller('cdt/contracts')
export class CdtContractsController {
  constructor(private readonly service: CdtContractsService) {}

  @Get()
  list(
    @Query() pagination: PaginationQueryDto,
    @Query() filters: ListCdtContractsDto,
  ) {
    return this.service.list(pagination, filters);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateCdtContractDto) {
    return this.service.create(dto);
  }
}
