import { Type } from 'class-transformer';
import { IsDateString, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateCdtRenewalDto {
  @IsString()
  contratoId!: string;

  @IsDateString()
  fechaPropuesta!: string;

  @Type(() => Number)
  @IsNumber()
  nuevoPlazo!: number;

  @Type(() => Number)
  @IsNumber()
  nuevaTasa!: number;

  @IsOptional()
  @IsString()
  estado?: string;
}
