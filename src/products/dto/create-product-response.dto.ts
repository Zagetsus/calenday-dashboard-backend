import { ApiProperty } from '@nestjs/swagger';
import { snakeKeys } from '~/common/utils';

export class CreateProductResponseDTO {
  @ApiProperty({
    type: String,
    description: 'Identificador do registro do produto',
    example: '010b32d0-0f04-4e33-8dbf-67db712b219d',
    required: true
  })
  id: string;

  @ApiProperty({
    type: String,
    description: 'Referencia do produto',
    example: '',
    required: true
  })
  reference: string;

  @ApiProperty({
    type: String,
    description: 'Nome/Descrição do produto',
    example: '',
    required: true
  })
  name: string;

  @ApiProperty({
    type: String,
    description: 'Status do produto',
    example: '',
    required: true
  })
  status: string;

  @ApiProperty({
    type: String,
    description: 'Marca do produto',
    example: '',
    required: true
  })
  brand: string;

  @ApiProperty({
    type: Number,
    description: 'Preço do produto',
    example: '',
    required: true
  })
  price: number;

  @ApiProperty({
    type: Number,
    description: 'Quantidade no estoque do produto',
    example: '',
    required: true
  })
  stock: number;

  @ApiProperty({
    type: String,
    description: '',
    example: '',
    required: true
  })
  type: string;

  @ApiProperty({
    type: String,
    description: '',
    example: '',
    required: true
  })
  category: string;

  @ApiProperty({
    name: 'company_id',
    type: String,
    description: '',
    example: '',
    required: true
  })
  companyId: string;

  @ApiProperty({
    name: 'created_at',
    type: String,
    description: '',
    example: '',
    required: true
  })
  createdAt: string;

  @ApiProperty({
    name: 'updated_at',
    type: String,
    description: '',
    example: '',
    required: true
  })
  updatedAt: string;

  @ApiProperty({
    name: 'deleted_at',
    type: String,
    description: '',
    example: '',
    required: true
  })
  deletedAt: string | null;

  static factory(product) {
    return snakeKeys(product);
  }
}
