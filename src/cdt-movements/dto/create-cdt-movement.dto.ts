import { Type } from 'class-transformer';
import { IsDateString, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { CdtMovimientoTipo } from '@prisma/client';

export class CreateCdtMovementDto {
  @IsString()
  contratoId!: string;

  @IsEnum(CdtMovimientoTipo)
  tipo!: CdtMovimientoTipo;

  @Type(() => Number)
  @IsNumber()
  valor!: number;

  @IsDateString()
  fechaValor!: string;

  @IsOptional()
  @IsString()
  referencia?: string;

  @IsOptional()
  @IsString()
  documentoSoporteId?: string;

  @Type(() => Number)
  @IsNumber()
  saldoPosterior!: number;

  @IsOptional()
  @IsString()
  descripcion?: string;
}
