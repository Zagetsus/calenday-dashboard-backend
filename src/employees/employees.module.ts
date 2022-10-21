import { Module } from '@nestjs/common';
import { AppLogger } from '~/app.logger';
import { PrismaService } from '~/common/service';
import { EmployeesController } from '~/employees/employees.controller';
import { EmployeesRepository } from '~/employees/employees.repository';
import { EmployeesService } from '~/employees/employees.service';

const dependency = [
  EmployeesService,
  EmployeesRepository,
  AppLogger,
  PrismaService
];
@Module({
  providers: dependency,
  controllers: [EmployeesController]
})
export class EmployeesModule {}
