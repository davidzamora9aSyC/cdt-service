import { IsEnum, IsOptional, IsString } from 'class-validator';
import { CdtMovimientoTipo } from '@prisma/client';

export class ListCdtMovementsDto {
  @IsOptional()
  @IsEnum(CdtMovimientoTipo)
  tipo?: CdtMovimientoTipo;

  @IsOptional()
  @IsString()
  from?: string;

  @IsOptional()
  @IsString()
  to?: string;
}
