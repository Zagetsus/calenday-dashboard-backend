import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class SpecialtiesResponseDto {
  @ApiProperty({
    type: String,
    description: 'Identificador do registro',
    example: '8cc93c8c-3a33-4393-82d5-ce4417ea33ff',
    required: true
  })
  id: string;

  @ApiProperty({
    type: String,
    description: 'Nome da especialidade',
    example: 'Manicure',
    required: true
  })
  specialty: string;

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
}
