import { Injectable } from '@nestjs/common';
import { Prisma, Company as CompanyModel } from '@prisma/client';
import { PrismaService } from '~/common/service';

@Injectable()
export class CompaniesRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async createCompany(
    data: Prisma.CompanyUncheckedCreateInput
  ): Promise<CompanyModel> {
    return await this.prismaService.company.create({ data });
  }

  async getAll(params: {
    where?: Prisma.CompanyWhereInput;
    include?: Prisma.CompanyInclude;
  }): Promise<CompanyModel[]> {
    const { where, include } = params;
    return await this.prismaService.company.findMany({ where, include });
  }
}
