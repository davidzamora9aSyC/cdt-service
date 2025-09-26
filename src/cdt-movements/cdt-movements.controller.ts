import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CdtMovementsService } from './cdt-movements.service';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { ListCdtMovementsDto } from './dto/list-cdt-movements.dto';
import { CreateCdtMovementDto } from './dto/create-cdt-movement.dto';

@Controller('cdt/contracts/:contractId/movements')
export class CdtMovementsController {
  constructor(private readonly service: CdtMovementsService) {}

  @Get()
  list(
    @Param('contractId') contractId: string,
    @Query() pagination: PaginationQueryDto,
    @Query() filters: ListCdtMovementsDto,
  ) {
    return this.service.listByContract(contractId, pagination, filters);
  }

  @Post()
  create(@Param('contractId') contractId: string, @Body() dto: CreateCdtMovementDto) {
    return this.service.create({ ...dto, contratoId: contractId });
  }
}
