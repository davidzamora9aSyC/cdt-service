import { IsOptional, IsString } from 'class-validator';

export class UpdateCdtRenewalDto {
  @IsOptional()
  @IsString()
  estado?: string;
}
