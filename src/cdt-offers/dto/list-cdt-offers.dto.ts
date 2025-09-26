import { IsEnum, IsOptional, IsString } from 'class-validator';
import { CdtModalidadPago } from '@prisma/client';

export class ListCdtOffersDto {
  @IsOptional()
  @IsString()
  entidadId?: string;

  @IsOptional()
  @IsEnum(CdtModalidadPago)
  modalidadPago?: CdtModalidadPago;

  @IsOptional()
  @IsString()
  search?: string;
}
