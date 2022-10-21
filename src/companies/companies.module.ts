import { Module } from '@nestjs/common';
import { AppLogger } from '~/app.logger';
import { PrismaService } from '~/common/service';
import { CompaniesController } from '~/companies/companies.controller';
import { CompaniesRepository } from '~/companies/companies.repository';
import { CompaniesService } from '~/companies/companies.service';
import { UsersRepository } from '~/users/users.repository';
import { UsersService } from '~/users/users.service';

@Module({
  providers: [
    CompaniesService,
    PrismaService,
    AppLogger,
    CompaniesRepository,
    UsersService,
    UsersRepository
  ],
  controllers: [CompaniesController]
})
export class CompaniesModule {}
