import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { ListCdtContractsDto } from './dto/list-cdt-contracts.dto';
import { CreateCdtContractDto } from './dto/create-cdt-contract.dto';

@Injectable()
export class CdtContractsService {
  constructor(private readonly prisma: PrismaService) {}

  async list(pagination: PaginationQueryDto, filters: ListCdtContractsDto) {
    const where: Prisma.CdtContratoWhereInput = {
      solicitud: {
        usuarioId: filters.usuarioId,
      },
      estado: filters.estado,
    };

    const [data, total] = await this.prisma.$transaction([
      this.prisma.cdtContrato.findMany({
        where,
        skip: pagination.skip,
        take: pagination.take,
        orderBy: { fechaApertura: 'desc' },
        include: {
          solicitud: {
            include: {
              oferta: {
                include: { entidad: true },
              },
            },
          },
          movimientos: true,
          renovaciones: true,
        },
      }),
      this.prisma.cdtContrato.count({ where }),
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
    const contrato = await this.prisma.cdtContrato.findUnique({
      where: { id },
      include: {
        solicitud: {
          include: {
            oferta: {
              include: { entidad: true },
            },
          },
        },
        movimientos: true,
        renovaciones: true,
      },
    });

    if (!contrato) {
      throw new NotFoundException(`Contrato ${id} no encontrado`);
    }

    return contrato;
  }

  async create(dto: CreateCdtContractDto) {
    return this.prisma.cdtContrato.create({
      data: {
        solicitudId: dto.solicitudId,
        numeroCertificado: dto.numeroCertificado,
        fechaApertura: new Date(dto.fechaApertura),
        fechaVencimiento: new Date(dto.fechaVencimiento),
        capital: dto.capital,
        tasaNegociada: dto.tasaNegociada,
        soporteDepositoId: dto.soporteDepositoId,
        estado: dto.estado,
      },
    });
  }
}
