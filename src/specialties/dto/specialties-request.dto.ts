import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class SpecialtiesRequestDto {
  @ApiProperty({
    type: String,
    maxLength: 30,
    description:
      'Nome da especialidade do funcionário ex. Cabeleireira, Manicure',
    example: 'Cabeleireira',
    required: true
  })
  @MaxLength(30)
  @IsNotEmpty()
  @IsString()
  specialty: string;
}
