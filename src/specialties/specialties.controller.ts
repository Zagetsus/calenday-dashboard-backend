import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags
} from '@nestjs/swagger';
import { BadRequestDto } from '~/common/dto';
import {
  SpecialtiesRequestDto,
  SpecialtiesResponseDto
} from '~/specialties/dto';
import { SpecialtiesService } from '~/specialties/specialties.service';

@ApiTags('specialties')
@Controller('specialties')
export class SpecialtiesController {
  constructor(private readonly specialtyService: SpecialtiesService) {}

  @ApiCreatedResponse({
    type: SpecialtiesResponseDto
  })
  @ApiBadRequestResponse({
    type: BadRequestDto
  })
  @Post()
  async createSpecialty(@Body() body: SpecialtiesRequestDto) {
    return await this.specialtyService
      .createSpecialty({
        specialty: body.specialty
      })
      .catch(error => {
        throw new BadRequestException(error.message);
      });
  }

  @ApiOkResponse({
    type: [SpecialtiesResponseDto]
  })
  @ApiBadRequestResponse({
    type: BadRequestDto
  })
  @Get()
  async getAllSpecialties() {
    return await this.specialtyService.getAllSpecialties();
  }
}
