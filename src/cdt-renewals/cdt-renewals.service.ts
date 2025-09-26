import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { CreateCdtRenewalDto } from './dto/create-cdt-renewal.dto';
import { UpdateCdtRenewalDto } from './dto/update-cdt-renewal.dto';

@Injectable()
export class CdtRenewalsService {
  constructor(private readonly prisma: PrismaService) {}

  async listByContract(contractId: string, pagination: PaginationQueryDto) {
    const where: Prisma.CdtRenovacionWhereInput = {
      contratoId: contractId,
    };

    const [data, total] = await this.prisma.$transaction([
      this.prisma.cdtRenovacion.findMany({
        where,
        skip: pagination.skip,
        take: pagination.take,
        orderBy: { fechaPropuesta: 'desc' },
      }),
      this.prisma.cdtRenovacion.count({ where }),
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

  async create(dto: CreateCdtRenewalDto) {
    return this.prisma.cdtRenovacion.create({
      data: {
        contratoId: dto.contratoId,
        fechaPropuesta: new Date(dto.fechaPropuesta),
        nuevoPlazo: dto.nuevoPlazo,
        nuevaTasa: dto.nuevaTasa,
        estado: dto.estado ?? 'PROPUESTA',
      },
    });
  }

  async update(id: string, dto: UpdateCdtRenewalDto) {
    const existing = await this.prisma.cdtRenovacion.findUnique({ where: { id } });
    if (!existing) {
      throw new NotFoundException(`Renovación ${id} no encontrada`);
    }

    return this.prisma.cdtRenovacion.update({
      where: { id },
      data: {
        estado: dto.estado ?? existing.estado,
      },
    });
  }
}
