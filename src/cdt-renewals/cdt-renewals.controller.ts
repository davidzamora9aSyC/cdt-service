import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CdtRenewalsService } from './cdt-renewals.service';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { CreateCdtRenewalDto } from './dto/create-cdt-renewal.dto';
import { UpdateCdtRenewalDto } from './dto/update-cdt-renewal.dto';

@Controller('cdt/contracts/:contractId/renewals')
export class CdtRenewalsController {
  constructor(private readonly service: CdtRenewalsService) {}

  @Get()
  list(
    @Param('contractId') contractId: string,
    @Query() pagination: PaginationQueryDto,
  ) {
    return this.service.listByContract(contractId, pagination);
  }

  @Post()
  create(@Param('contractId') contractId: string, @Body() dto: CreateCdtRenewalDto) {
    return this.service.create({ ...dto, contratoId: contractId });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateCdtRenewalDto) {
    return this.service.update(id, dto);
  }
}
