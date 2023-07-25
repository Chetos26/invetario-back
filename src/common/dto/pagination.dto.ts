import { IsNumber, IsOptional, IsPositive } from 'class-validator';

export class PaginationDto {
  @IsNumber()
  @IsOptional()
  @IsPositive()
  limit: number;

  @IsNumber()
  @IsOptional()
  offset: number;
}
