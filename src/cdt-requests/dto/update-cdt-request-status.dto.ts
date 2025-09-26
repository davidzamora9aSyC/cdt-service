import { IsEnum, IsOptional, IsString } from 'class-validator';
import { CdtSolicitudEstado } from '@prisma/client';

export class UpdateCdtRequestStatusDto {
  @IsEnum(CdtSolicitudEstado)
  estado!: CdtSolicitudEstado;

  @IsOptional()
  @IsString()
  razonRechazo?: string;
}
