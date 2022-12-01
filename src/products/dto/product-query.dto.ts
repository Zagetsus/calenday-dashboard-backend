import { ApiPropertyOptional } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, Max, Min } from 'class-validator';

export class ProductQueryDTO {
  @ApiPropertyOptional({
    type: Number,
    description: 'Número da página',
    name: 'page',
    minimum: 1,
    example: 1
  })
  @Type(() => Number)
  @Min(1)
  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  @Expose({ name: 'page' })
  page?: number;

  @ApiPropertyOptional({
    type: Number,
    description: 'Número de items por página',
    name: 'limit',
    minimum: 1,
    maximum: 20,
    example: 1
  })
  @Type(() => Number)
  @Min(1)
  @Max(20)
  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  @Expose({ name: 'limit' })
  limit?: number;
}
