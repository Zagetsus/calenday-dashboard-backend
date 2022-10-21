import { ApiProperty } from '@nestjs/swagger';

export class EmployeeRequestDto {
  @ApiProperty({
    type: String
  })
  UserId: string;
}
