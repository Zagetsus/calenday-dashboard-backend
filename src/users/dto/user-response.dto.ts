import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { snakeKeys } from '~/common/utils';

export class UserResponseDto {
  @ApiProperty({
    type: String,
    description: 'Identificação do registro',
    example: '8cc93c8c-3a33-4393-82d5-ce4417ea33ff',
    required: true
  })
  id: string;

  @ApiProperty({
    type: String,
    description: 'Nome completo do usuário',
    example: 'Tony Stark',
    required: true
  })
  name: string | null;

  @ApiProperty({
    type: String,
    description: 'E-mail do usuário',
    example: 'tonystark@gmail.com',
    required: true
  })
  email: string | null;

  @ApiProperty({
    type: String,
    description: 'Número de contato do celular do usuário',
    example: '(42) 98211-4617',
    required: false
  })
  phone: string | null;

  @ApiProperty({
    type: String,
    description: 'Documento do usuário',
    example: '326.740.970-51',
    required: false
  })
  document: string | null;

  @ApiProperty({
    name: 'birth_date',
    type: String,
    description: 'Documento do usuário',
    example: null,
    required: false
  })
  @Expose({ name: 'birth_date' })
  birthDate: Date | null;

  @ApiProperty({
    name: 'is_active',
    type: Boolean,
    description: 'Status do cadastro do usuário',
    example: true,
    required: false
  })
  @Expose({ name: 'is_active' })
  isActive: boolean;

  @ApiProperty({
    name: 'created_at',
    type: Date,
    description: 'Data do cadastro',
    example: '2022-09-21T03:11:59.177Z',
    required: false
  })
  @Expose({ name: 'created_at' })
  createdAt: Date | null;

  @ApiProperty({
    name: 'updated_at',
    type: Date,
    description: 'Atualização do cadastro',
    example: '2022-09-21T03:11:59.177Z',
    required: false
  })
  @Expose({ name: 'updated_at' })
  updatedAt: Date | null;

  @ApiProperty({
    name: 'deleted_at',
    type: Date,
    description: 'Data de deleção do cadastro',
    example: null,
    required: false
  })
  @Expose({ name: 'deleted_at' })
  deletedAt: null | Date;

  static factory(user) {
    return snakeKeys(user);
  }
}
