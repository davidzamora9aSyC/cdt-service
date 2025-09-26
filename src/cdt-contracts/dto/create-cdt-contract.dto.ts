import { Type } from 'class-transformer';
import { IsDateString, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { CdtContratoEstado } from '@prisma/client';

export class CreateCdtContractDto {
  @IsString()
  solicitudId!: string;

  @IsString()
  numeroCertificado!: string;

  @IsDateString()
  fechaApertura!: string;

  @IsDateString()
  fechaVencimiento!: string;

  @Type(() => Number)
  @IsNumber()
  capital!: number;

  @Type(() => Number)
  @IsNumber()
  tasaNegociada!: number;

  @IsOptional()
  @IsString()
  soporteDepositoId?: string;

  @IsEnum(CdtContratoEstado)
  estado!: CdtContratoEstado;
}
