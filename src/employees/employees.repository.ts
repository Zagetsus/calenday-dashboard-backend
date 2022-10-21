import { Injectable } from '@nestjs/common';
import { Prisma, Employee as EmployeeModel } from '@prisma/client';
import { PrismaService } from '~/common/service';
import {
  EmployeesListRepositoryDataResponse,
  EmployeesListRepositoryResponse
} from '~/employees/interfaces';

@Injectable()
export class EmployeesRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async createEmployees(
    data: Prisma.EmployeeUncheckedCreateInput
  ): Promise<EmployeeModel> {
    return await this.prismaService.employee.create({ data });
  }

  async getAll(params: {
    where: Prisma.EmployeeWhereInput;
    include: Prisma.EmployeeInclude;
  }): Promise<EmployeeModel[]> {
    const { where, include } = params;
    return await this.prismaService.employee.findMany({ where, include });
  }

  async getEmployeesCount(params: {
    where?: Prisma.EmployeeWhereInput;
    take?: number;
    skip?: number;
  }): Promise<EmployeesListRepositoryResponse> {
    const { where, take, skip } = params;
    const [total, employees] = await this.prismaService.$transaction([
      this.prismaService.employee.count(),
      this.prismaService.employee.findMany({
        where,
        include: {
          user: { select: { name: true, email: true, phone: true } },
          specialty: { select: { specialty: true } }
        },
        take,
        skip
      })
    ]);

    const formatEmployees: EmployeesListRepositoryDataResponse[] =
      employees.map(employee => {
        return {
          id: employee.id,
          name: employee.user.name,
          email: employee.user.email,
          phone: employee.user.phone,
          occupation: employee.occupation,
          specialty: employee.specialty.specialty,
          createdAt: employee.createdAt
        };
      });

    return {
      results: total,
      data: formatEmployees
    };
  }
}
