import { ApiProperty } from '@nestjs/swagger';
import { ProductStatusEnum, ProductTypeEnum } from '@prisma/client';
import { Expose } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  Min
} from 'class-validator';

export class CreateProductRequestDTO {
  @ApiProperty({
    type: String,
    maxLength: 100,
    description: 'Referencia do produto do salão',
    example: '',
    required: true
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  @Expose()
  reference: string;

  @ApiProperty({
    type: String,
    maxLength: 150,
    description: 'Nome/descrição do produto',
    example: '',
    required: true
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  @Expose()
  name: string;

  @ApiProperty({
    type: String,
    description: 'Status do produto.',
    example: '',
    required: true
  })
  @IsEnum(ProductStatusEnum)
  @IsNotEmpty()
  @Expose()
  status: ProductStatusEnum;

  @ApiProperty({
    type: String,
    maxLength: 60,
    description: '',
    example: '',
    required: true
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(60)
  @Expose()
  brand: string;

  @ApiProperty({
    type: Number,
    description: 'Preço de venda do produto',
    example: 350.25,
    required: true
  })
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  @Expose()
  price: number;

  @ApiProperty({
    type: Number,
    description: 'Quantidade do produto em estoque',
    example: 100,
    required: true
  })
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  @Expose()
  stock: number;

  @ApiProperty({
    type: String,
    description: 'Tipo do produto',
    example: '',
    required: true
  })
  @IsEnum(ProductTypeEnum)
  @IsNotEmpty()
  @MaxLength(60)
  @Expose()
  type: ProductTypeEnum;

  @ApiProperty({
    name: 'category_id',
    type: String,
    description: 'Categoria do produto',
    example: '',
    required: true
  })
  @IsString()
  @IsNotEmpty()
  @Expose({ name: 'category_id' })
  categoryId: string;
}
