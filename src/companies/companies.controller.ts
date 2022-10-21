import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UseGuards
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiTags,
  ApiUnauthorizedResponse
} from '@nestjs/swagger';
import { GetUser } from '~/common/decorators';
import { BadRequestDto, UnauthorizedRequestDto } from '~/common/dto';
import { CompaniesService } from '~/companies/companies.service';
import { CompanyRequestDto, CompanyResponseDto } from '~/companies/dto';

@ApiTags('companies')
@UseGuards(AuthGuard('jwt'))
@Controller('companies')
export class CompaniesController {
  constructor(private readonly companyService: CompaniesService) {}

  @ApiCreatedResponse({
    type: CompanyResponseDto
  })
  @ApiBadRequestResponse({
    type: BadRequestDto
  })
  @ApiUnauthorizedResponse({
    type: UnauthorizedRequestDto
  })
  @Post()
  async createCompany(@GetUser() user, @Body() body: CompanyRequestDto) {
    const { id } = user;
    const response = await this.companyService
      .createCompany({ userId: id, body })
      .catch(error => {
        throw new BadRequestException(error.message);
      });

    return CompanyResponseDto.factory(response);
  }
}
