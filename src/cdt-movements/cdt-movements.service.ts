import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { ListCdtMovementsDto } from './dto/list-cdt-movements.dto';
import { CreateCdtMovementDto } from './dto/create-cdt-movement.dto';

@Injectable()
export class CdtMovementsService {
  constructor(private readonly prisma: PrismaService) {}

  async listByContract(contractId: string, pagination: PaginationQueryDto, filters: ListCdtMovementsDto) {
    const where: Prisma.CdtMovimientoWhereInput = {
      contratoId: contractId,
      tipo: filters.tipo,
      ...(filters.from || filters.to
        ? {
            fechaValor: {
              gte: filters.from ? new Date(filters.from) : undefined,
              lte: filters.to ? new Date(filters.to) : undefined,
            },
          }
        : {}),
    };

    const [data, total] = await this.prisma.$transaction([
      this.prisma.cdtMovimiento.findMany({
        where,
        skip: pagination.skip,
        take: pagination.take,
        orderBy: { fechaValor: 'desc' },
      }),
      this.prisma.cdtMovimiento.count({ where }),
    ]);

    return {
      data,
      meta: {
        total,
        page: pagination.page ?? 1,
        limit: pagination.take,
      },
    };
  }

  async create(dto: CreateCdtMovementDto) {
    return this.prisma.cdtMovimiento.create({
      data: {
        contratoId: dto.contratoId,
        tipo: dto.tipo,
        valor: dto.valor,
        fechaValor: new Date(dto.fechaValor),
        referencia: dto.referencia,
        documentoSoporteId: dto.documentoSoporteId,
        saldoPosterior: dto.saldoPosterior,
        descripcion: dto.descripcion,
      },
    });
  }
}
