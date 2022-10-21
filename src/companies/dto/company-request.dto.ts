import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CompanyRequestDto {
  @ApiProperty({
    type: String,
    maxLength: 18,
    description: 'CNPJ da empresa do usuário',
    example: '36.246.992/0001-89',
    required: true
  })
  @MaxLength(18)
  @IsNotEmpty()
  @IsString()
  document: string;

  @ApiProperty({
    type: String,
    maxLength: 150,
    description: 'Nome do salão de beleza',
    example: 'Salone di Belleza',
    required: true
  })
  @MaxLength(150)
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    name: 'corporate_name',
    type: String,
    maxLength: 255,
    description: 'Razão social da empresa',
    example: 'Salao de Beleza Fabiola Fonseca Cabelo & Maquiagem LTDA',
    required: true
  })
  @MaxLength(255)
  @IsNotEmpty()
  @IsString()
  @Expose({ name: 'corporate_name' })
  corporateName: string;

  @ApiProperty({
    name: 'trading_name',
    type: String,
    maxLength: 255,
    description: 'Nome fantasia da empresa',
    example: 'Salao de Beleza Isolete',
    required: true
  })
  @MaxLength(255)
  @IsNotEmpty()
  @IsString()
  @Expose({ name: 'trading_name' })
  tradingName: string;
}
