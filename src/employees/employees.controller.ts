import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
  UseGuards
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse
} from '@nestjs/swagger';
import { GetUser } from '~/common/decorators';
import { BadRequestDto, UnauthorizedRequestDto } from '~/common/dto';
import { EmployeeQueryDto, EmployeesListResponseDto } from '~/employees/dto';
import { EmployeesService } from '~/employees/employees.service';

@ApiTags('employees')
@UseGuards(AuthGuard('jwt'))
@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeeService: EmployeesService) {}

  @ApiBadRequestResponse({
    type: [BadRequestDto]
  })
  @ApiUnauthorizedResponse({
    type: [UnauthorizedRequestDto]
  })
  @Post()
  async createEmployee(@GetUser() user, @Body() body) {
    return 'create';
  }

  @ApiOkResponse({
    type: EmployeesListResponseDto
  })
  @ApiBadRequestResponse({
    type: [BadRequestDto]
  })
  @ApiUnauthorizedResponse({
    type: [UnauthorizedRequestDto]
  })
  @Get()
  async getAllEmployee(@GetUser() user, @Query() params: EmployeeQueryDto) {
    const { company } = user;
    const { limit: limitLines = 10, page: currentPage = 1 } = params;

    const { totalPages, page, employees, results } =
      await this.employeeService.getAllEmployees({
        companyId: company.id,
        skip: currentPage,
        take: limitLines
      });

    return EmployeesListResponseDto.factory({
      data: employees,
      currentPage: page,
      totalPages,
      results
    });
  }

  @ApiBadRequestResponse({
    type: [BadRequestDto]
  })
  @ApiUnauthorizedResponse({
    type: [UnauthorizedRequestDto]
  })
  @Put()
  async updateEmployee(@GetUser() user, @Body() body) {
    return 'create';
  }

  @ApiBadRequestResponse({
    type: [BadRequestDto]
  })
  @ApiUnauthorizedResponse({
    type: [UnauthorizedRequestDto]
  })
  @Delete(':id')
  async removeEmployee(@GetUser() user) {
    return 'create';
  }
}
