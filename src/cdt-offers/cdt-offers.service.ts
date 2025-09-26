import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { ListCdtOffersDto } from './dto/list-cdt-offers.dto';

@Injectable()
export class CdtOffersService {
  constructor(private readonly prisma: PrismaService) {}

  async list(pagination: PaginationQueryDto, filters: ListCdtOffersDto) {
    const where: Prisma.CdtOfertaWhereInput = {
      entidadId: filters.entidadId,
      modalidadPago: filters.modalidadPago,
      ...(filters.search
        ? {
            OR: [
              { codigo: { contains: filters.search, mode: 'insensitive' } },
              { entidad: { nombre: { contains: filters.search, mode: 'insensitive' } } },
            ],
          }
        : {}),
    };

    const [data, total] = await this.prisma.$transaction([
      this.prisma.cdtOferta.findMany({
        where,
        skip: pagination.skip,
        take: pagination.take,
        include: {
          entidad: true,
        },
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.cdtOferta.count({ where }),
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

  async findOne(id: string) {
    return this.prisma.cdtOferta.findUnique({
      where: { id },
      include: { entidad: true },
    });
  }
}
