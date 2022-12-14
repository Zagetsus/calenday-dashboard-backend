import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength
} from 'class-validator';

export class AuthCredentialsRequestDTO {
  @Expose()
  @IsEmail()
  @MaxLength(191)
  @ApiProperty({
    type: String,
    description: 'E-mail do usuário',
    example: 'tonystark@gmail.com'
  })
  email: string;

  @Expose()
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @ApiProperty({
    type: String,
    description: 'Senha do usuário',
    example: '123Ch@nge'
  })
  password: string;
}
