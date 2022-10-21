import { Injectable } from '@nestjs/common';
import { Prisma, Specialty as SpecialtyModel } from '@prisma/client';
import { PrismaService } from '~/common/service';

@Injectable()
export class SpecialtiesRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async createOccupation(
    data: Prisma.SpecialtyUncheckedCreateInput
  ): Promise<SpecialtyModel> {
    return await this.prismaService.specialty.create({ data });
  }

  async getAll(params: {
    where?: Prisma.SpecialtyWhereInput;
    include?: Prisma.SpecialtyInclude;
  }): Promise<SpecialtyModel[]> {
    const { where, include } = params;
    return await this.prismaService.specialty.findMany({ where, include });
  }
}
