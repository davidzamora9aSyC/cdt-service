import { Transform } from 'class-transformer';
import { IsInt, IsOptional, Min } from 'class-validator';

export class PaginationQueryDto {
  @Transform(({ value }) => (value !== undefined ? parseInt(value, 10) : undefined))
  @IsInt()
  @Min(1)
  @IsOptional()
  page?: number;

  @Transform(({ value }) => (value !== undefined ? parseInt(value, 10) : undefined))
  @IsInt()
  @Min(1)
  @IsOptional()
  limit?: number;

  get skip(): number {
    const page = this.page ?? 1;
    const limit = this.limit ?? 25;
    return (page - 1) * limit;
  }

  get take(): number {
    return this.limit ?? 25;
  }
}
