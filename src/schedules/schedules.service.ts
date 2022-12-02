import { Injectable } from '@nestjs/common';
import { AppLogger } from '~/app.logger';
import { ScheduleParams } from '~/schedules/interfaces';
import { SchedulesRepository } from '~/schedules/schedules.repository';
@Injectable()
export class SchedulesService {
  constructor(
    private readonly schedulesRepository: SchedulesRepository,
    private readonly logger: AppLogger
  ) {
    this.logger.setContext(SchedulesService.name);
  }

  async createSchedule({ userId, body }: ScheduleParams) {
    const {
      companyId,
      employeeId,
      endDate,
      serviceId,
      startDate,
      status,
      observation
    } = body;

    return await this.schedulesRepository.createSchedule({
      customerId: userId,
      serviceId,
      companyId,
      employeeId,
      observation,
      status,
      startDate,
      endDate
    });
  }
}
