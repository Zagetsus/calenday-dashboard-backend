import { Injectable } from '@nestjs/common';
import { Prisma, Schedule as ScheduleModel } from '@prisma/client';
import { PrismaService } from '~/common/service';

@Injectable()
export class SchedulesRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async createSchedule(
    data: Prisma.ScheduleUncheckedCreateInput
  ): Promise<ScheduleModel> {
    return await this.prismaService.schedule.create({ data });
  }

  async getAll(params: {
    where?: Prisma.ScheduleWhereInput;
    include?: Prisma.ScheduleInclude;
  }): Promise<ScheduleModel[]> {
    const { where, include } = params;
    return await this.prismaService.schedule.findMany({ where, include });
  }
}
