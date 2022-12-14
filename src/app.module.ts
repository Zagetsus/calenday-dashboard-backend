import { Module } from '@nestjs/common';
import { AuthModule } from '~/auth/auth.module';
import { CompaniesModule } from '~/companies/companies.module';
import { EmployeesModule } from '~/employees/employees.module';
import { RootController } from '~/root/root.controller';
import { RootService } from '~/root/root.service';
import { SchedulesModule } from '~/schedules/schedules.module';
import { ServicesModule } from '~/services/services.module';
import { SpecialtiesModule } from '~/specialties/specialties.module';
import { UsersModule } from '~/users/users.module';
import { ProductsModule } from './products/products.module';
import { DashboardModule } from './dashboard/dashboard.module';

@Module({
  imports: [
    UsersModule,
    CompaniesModule,
    AuthModule,
    EmployeesModule,
    SpecialtiesModule,
    ServicesModule,
    SchedulesModule,
    ProductsModule,
    DashboardModule
  ],
  controllers: [RootController],
  providers: [RootService]
})
export class AppModule {}
