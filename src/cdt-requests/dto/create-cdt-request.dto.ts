import { Type } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { CdtSolicitudEstado } from '@prisma/client';

export class CreateCdtRequestDto {
  @IsString()
  usuarioId!: string;

  @IsString()
  ofertaId!: string;

  @Type(() => Number)
  @IsNumber()
  monto!: number;

  @Type(() => Number)
  @IsNumber()
  plazoSolicitado!: number;

  @IsOptional()
  @IsString()
  snapshotUsuarioId?: string;

  @IsOptional()
  @IsString()
  consentimientoId?: string;

  @IsOptional()
  @IsString()
  documentoFormularioId?: string;

  @IsOptional()
  @IsString()
  notaInterna?: string;

  @IsOptional()
  @IsEnum(CdtSolicitudEstado)
  estado?: CdtSolicitudEstado;
}
