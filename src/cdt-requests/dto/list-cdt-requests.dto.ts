import { IsEnum, IsOptional, IsString } from 'class-validator';
import { CdtSolicitudEstado } from '@prisma/client';

export class ListCdtRequestsDto {
  @IsOptional()
  @IsString()
  usuarioId?: string;

  @IsOptional()
  @IsString()
  ofertaId?: string;

  @IsOptional()
  @IsEnum(CdtSolicitudEstado)
  estado?: CdtSolicitudEstado;
}
