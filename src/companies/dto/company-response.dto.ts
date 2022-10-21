import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { snakeKeys } from '~/common/utils';

export class CompanyResponseDto {
  @ApiProperty({
    type: String,
    description: 'Identificação do registro',
    example: 'b87cbf27-2325-454c-843a-d29af7ceb6b2',
    required: true
  })
  id: string;

  @ApiProperty({
    name: 'user_id',
    type: String,
    description: 'Identificação do usuário',
    example: '8cc93c8c-3a33-4393-82d5-ce4417ea33ff',
    required: true
  })
  @Expose({ name: 'user_id' })
  userId: string;

  @ApiProperty({
    type: String,
    description: 'Nome do Salão',
    example: 'Salone di Belleza',
    required: true
  })
  name: string;

  @ApiProperty({
    type: String,
    description: 'Documento da empresa do usuário',
    example: '36.246.992/0001-89',
    required: false
  })
  document: string;

  @ApiProperty({
    name: 'corporate_name',
    type: String,
    description: 'Razão social da empresa',
    example: 'Salao de Beleza Fabiola Fonseca Cabelo & Maquiagem LTDA',
    required: true
  })
  @Expose({ name: 'corporate_name' })
  corporateName: string;

  @ApiProperty({
    name: 'trading_name',
    type: String,
    description: 'Nome fantasia da empresa',
    example: 'Salao de Beleza Isolete',
    required: true
  })
  @Expose({ name: 'trading_name' })
  trading_name: string;

  @ApiProperty({
    name: 'created_at',
    type: Date,
    description: 'Data de criação do registro',
    example: '2022-09-26T23:05:01.469Z',
    required: true
  })
  @Expose({ name: 'created_at' })
  createdAt: Date;

  @ApiProperty({
    name: 'updated_at',
    type: Date,
    description: 'Data de atualização do registro',
    example: '2022-09-26T23:05:01.469Z',
    required: true
  })
  @Expose({ name: 'updated_at' })
  updatedAt: Date;

  @ApiProperty({
    name: 'deleted_at',
    type: Date,
    description: 'Data de remoção do registro',
    example: '2022-09-26T23:05:01.469Z',
    required: true
  })
  @Expose({ name: 'deleted_at' })
  deletedAt: Date | null;

  static factory(company) {
    return snakeKeys(company);
  }
}
