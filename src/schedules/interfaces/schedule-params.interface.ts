import { ScheduleStatusEnum } from '@prisma/client';

export interface ScheduleBodyParams {
  serviceId: string;
  companyId: string;
  employeeId: string;
  observation?: string;
  status: ScheduleStatusEnum;
  startDate: Date;
  endDate: Date;
}

export interface ScheduleParams {
  userId: string;
  body: ScheduleBodyParams;
}
