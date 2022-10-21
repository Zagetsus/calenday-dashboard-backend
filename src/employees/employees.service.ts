import { Injectable } from '@nestjs/common';
import { EmployeesRepository } from '~/employees/employees.repository';
import { EmployeesListResponse, EmployeesParams } from '~/employees/interfaces';

@Injectable()
export class EmployeesService {
  constructor(private readonly employeeRepository: EmployeesRepository) {}

  getTotalPagesRounded(totalLines: number, limitLines: number): number {
    const totalPages = Number(totalLines) || 1;
    return Math.ceil(totalPages / limitLines);
  }

  async getAllEmployees(
    params: EmployeesParams
  ): Promise<EmployeesListResponse> {
    const { companyId, skip, take } = params;
    const skipCalculated = (skip - 1) * take;
    const employees = await this.employeeRepository.getEmployeesCount({
      where: {
        companyId
      },
      skip: skipCalculated,
      take
    });

    return {
      totalPages: this.getTotalPagesRounded(employees.results, take),
      page: skip,
      results: employees.results,
      employees: employees.data
    };
  }
}
