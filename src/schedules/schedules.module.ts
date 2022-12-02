import { Module } from '@nestjs/common';
import { AppLogger } from '~/app.logger';
import { PrismaService } from '~/common/service';
import { SchedulesController } from './schedules.controller';
import { SchedulesRepository } from './schedules.repository';
import { SchedulesService } from './schedules.service';

@Module({
  providers: [SchedulesService, AppLogger, SchedulesRepository, PrismaService],
  controllers: [SchedulesController]
})
export class SchedulesModule {}
