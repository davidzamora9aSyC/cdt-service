import { IsEnum, IsOptional, IsString } from 'class-validator';
import { CdtContratoEstado } from '@prisma/client';

export class ListCdtContractsDto {
  @IsOptional()
  @IsString()
  usuarioId?: string;

  @IsOptional()
  @IsEnum(CdtContratoEstado)
  estado?: CdtContratoEstado;
}
