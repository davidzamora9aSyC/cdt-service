import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CdtRequestsService } from './cdt-requests.service';
import { CreateCdtRequestDto } from './dto/create-cdt-request.dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { ListCdtRequestsDto } from './dto/list-cdt-requests.dto';
import { UpdateCdtRequestStatusDto } from './dto/update-cdt-request-status.dto';
import { AttachDocumentDto } from './dto/attach-document.dto';

@Controller('cdt/requests')
export class CdtRequestsController {
  constructor(private readonly service: CdtRequestsService) {}

  @Post()
  create(@Body() dto: CreateCdtRequestDto) {
    return this.service.create(dto);
  }

  @Get()
  list(
    @Query() pagination: PaginationQueryDto,
    @Query() filters: ListCdtRequestsDto,
  ) {
    return this.service.list(pagination, filters);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id/status')
  updateEstado(@Param('id') id: string, @Body() dto: UpdateCdtRequestStatusDto) {
    return this.service.updateEstado(id, dto);
  }

  @Post(':id/documents')
  attachDocument(@Param('id') id: string, @Body() dto: AttachDocumentDto) {
    return this.service.attachDocument(id, dto);
  }
}
