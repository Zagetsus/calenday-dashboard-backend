import { ScheduleStatusEnum } from '@prisma/client';
import { Expose } from 'class-transformer';

export class ScheduleRequestDto {
  @Expose({ name: 'service_id' })
  serviceId: string;

  @Expose({ name: 'company_id' })
  companyId: string;

  @Expose({ name: 'expose_id' })
  employeeId: string;

  @Expose({ name: 'observation' })
  observation?: string;

  @Expose({ name: 'status' })
  status: ScheduleStatusEnum;

  @Expose({ name: 'start_date' })
  startDate: Date;

  @Expose({ name: 'end_date' })
  endDate: Date;
}
