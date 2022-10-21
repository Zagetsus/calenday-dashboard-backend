import { Injectable } from '@nestjs/common';
import { AppLogger } from '~/app.logger';
import { UnexpectedError } from '~/common/errors';
import { SpecialtiesParams } from '~/specialties/interfaces';
import { SpecialtiesRepository } from '~/specialties/specialties.repository';

@Injectable()
export class SpecialtiesService {
  constructor(
    private readonly specialtyRepository: SpecialtiesRepository,
    private readonly logger: AppLogger
  ) {
    this.logger.setContext(SpecialtiesService.name);
  }

  async thereIsNoSpecialtyOrThrowError(specialty: string) {
    const occupations = await this.specialtyRepository.getAll({
      where: {
        specialty
      }
    });
    const hasOccupation = !!occupations.length;

    if (hasOccupation) {
      const errorMessage = 'specialty already exists';
      this.logger.fail({
        category: 'SPECIALTY_SERVICE_ERROR',
        error: errorMessage
      });
      throw new UnexpectedError(errorMessage);
    }

    return hasOccupation;
  }

  async createSpecialty(params: SpecialtiesParams) {
    await this.thereIsNoSpecialtyOrThrowError(params.specialty);
    return await this.specialtyRepository.createOccupation({
      specialty: params.specialty
    });
  }

  async getAllSpecialties() {
    return await this.specialtyRepository.getAll({});
  }
}
