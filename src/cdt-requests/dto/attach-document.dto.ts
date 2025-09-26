import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class AttachDocumentDto {
  @IsString()
  documentoSoporteId!: string;

  @IsString()
  tipo!: string;

  @IsOptional()
  @IsBoolean()
  validado?: boolean;
}
