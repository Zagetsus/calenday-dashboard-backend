import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength
} from 'class-validator';

export class UserRequestDto {
  @ApiProperty({
    type: String,
    minLength: 4,
    maxLength: 150,
    description: 'Nome completo do cliente',
    example: 'Tony Stark',
    required: true
  })
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(150)
  @IsString()
  name: string;

  @ApiProperty({
    type: String,
    description: 'E-mail para autenticação do usuário',
    example: 'tony.stark@gmail.com',
    required: true
  })
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty({
    type: String,
    minLength: 4,
    description: 'Senha para autenticação do usuário',
    example: '12345678',
    required: true
  })
  @IsNotEmpty()
  @MinLength(4)
  @IsString()
  password: string;

  @ApiProperty({
    type: String,
    description: 'Celular para contato',
    example: '(66) 96826-3858',
    required: true
  })
  @IsNotEmpty()
  @IsString()
  phone: string;

  @ApiProperty({
    type: String,
    description: 'CPF do usuário',
    example: '554.545.720-80',
    required: true
  })
  @IsNotEmpty()
  @IsString()
  document: string;

  @ApiProperty({
    name: 'birth_date',
    type: String,
    description: 'Data de nascimento',
    example: '18/09/2001',
    required: false
  })
  @IsOptional()
  @Expose({ name: 'birth_date' })
  @IsNotEmpty()
  @IsString()
  birthDate: Date;
}
