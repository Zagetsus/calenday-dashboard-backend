import { Module } from '@nestjs/common';
import { AppLogger } from '~/app.logger';
import { PrismaService } from '~/common/service';
import { SpecialtiesController } from '~/specialties/specialties.controller';
import { SpecialtiesRepository } from '~/specialties/specialties.repository';
import { SpecialtiesService } from '~/specialties/specialties.service';

@Module({
  providers: [
    SpecialtiesService,
    SpecialtiesRepository,
    PrismaService,
    AppLogger
  ],
  controllers: [SpecialtiesController]
})
export class SpecialtiesModule {}
