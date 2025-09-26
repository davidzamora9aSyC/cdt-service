import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CdtSolicitudEstado, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { CreateCdtRequestDto } from './dto/create-cdt-request.dto';
import { ListCdtRequestsDto } from './dto/list-cdt-requests.dto';
import { UpdateCdtRequestStatusDto } from './dto/update-cdt-request-status.dto';
import { AttachDocumentDto } from './dto/attach-document.dto';

@Injectable()
export class CdtRequestsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateCdtRequestDto) {
    return this.prisma.cdtSolicitud.create({
      data: {
        usuarioId: dto.usuarioId,
        ofertaId: dto.ofertaId,
        monto: dto.monto,
        plazoSolicitado: dto.plazoSolicitado,
        estado: dto.estado ?? CdtSolicitudEstado.BORRADOR,
        snapshotUsuarioId: dto.snapshotUsuarioId,
        consentimientoId: dto.consentimientoId,
        documentoFormularioId: dto.documentoFormularioId,
        notaInterna: dto.notaInterna,
      },
    });
  }

  async list(pagination: PaginationQueryDto, filters: ListCdtRequestsDto) {
    const where: Prisma.CdtSolicitudWhereInput = {
      usuarioId: filters.usuarioId,
      ofertaId: filters.ofertaId,
      estado: filters.estado,
    };

    const [data, total] = await this.prisma.$transaction([
      this.prisma.cdtSolicitud.findMany({
        where,
        skip: pagination.skip,
        take: pagination.take,
        include: {
          oferta: {
            include: { entidad: true },
          },
          contrato: true,
        },
        orderBy: { fechaSolicitud: 'desc' },
      }),
      this.prisma.cdtSolicitud.count({ where }),
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
    const solicitud = await this.prisma.cdtSolicitud.findUnique({
      where: { id },
      include: {
        oferta: {
          include: { entidad: true },
        },
        contrato: {
          include: { movimientos: true, renovaciones: true },
        },
        documentos: true,
      },
    });

    if (!solicitud) {
      throw new NotFoundException(`Solicitud ${id} no encontrada`);
    }

    return solicitud;
  }

  async updateEstado(id: string, dto: UpdateCdtRequestStatusDto) {
    const solicitud = await this.prisma.cdtSolicitud.findUnique({ where: { id } });
    if (!solicitud) {
      throw new NotFoundException(`Solicitud ${id} no encontrada`);
    }

    if (solicitud.estado === CdtSolicitudEstado.CANCELADA || solicitud.estado === CdtSolicitudEstado.RECHAZADA) {
      throw new BadRequestException('No es posible actualizar el estado de una solicitud cerrada.');
    }

    return this.prisma.cdtSolicitud.update({
      where: { id },
      data: {
        estado: dto.estado,
        razonRechazo: dto.razonRechazo,
        fechaDecision:
          dto.estado === CdtSolicitudEstado.APROBADA || dto.estado === CdtSolicitudEstado.RECHAZADA
            ? new Date()
            : solicitud.fechaDecision,
      },
    });
  }

  async attachDocument(id: string, dto: AttachDocumentDto) {
    const solicitud = await this.prisma.cdtSolicitud.findUnique({ where: { id } });
    if (!solicitud) {
      throw new NotFoundException(`Solicitud ${id} no encontrada`);
    }

    return this.prisma.cdtSolicitudDocumento.upsert({
      where: {
        solicitudId_documentoSoporteId: {
          solicitudId: id,
          documentoSoporteId: dto.documentoSoporteId,
        },
      },
      create: {
        solicitudId: id,
        documentoSoporteId: dto.documentoSoporteId,
        tipo: dto.tipo,
        validado: dto.validado ?? false,
      },
      update: {
        tipo: dto.tipo,
        validado: dto.validado ?? false,
      },
    });
  }
}
