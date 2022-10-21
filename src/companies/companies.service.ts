import { Injectable } from '@nestjs/common';
import { Company as CompanyModel } from '@prisma/client';
import { AppLogger } from '~/app.logger';
import { UnexpectedError } from '~/common/errors';
import { removeMaskUtil } from '~/common/utils';
import { CompaniesRepository } from '~/companies/companies.repository';
import { CompanyParams } from '~/companies/interfaces';
import { UsersService } from '~/users/users.service';

@Injectable()
export class CompaniesService {
  constructor(
    private readonly companyRepository: CompaniesRepository,
    private readonly userService: UsersService,
    private readonly logger: AppLogger
  ) {
    this.logger.setContext(CompaniesService.name);
  }

  async thereIsNoDocumentOrThrowError(document: string) {
    const companies = await this.companyRepository.getAll({
      where: {
        document
      }
    });
    const hasCompany = !!companies.length;

    if (hasCompany) {
      const errorMessage = 'document already exists';
      this.logger.fail({
        category: 'COMPANY_SERVICE_ERROR',
        error: errorMessage
      });
      throw new UnexpectedError(errorMessage);
    }

    return hasCompany;
  }

  async createCompany(params: CompanyParams): Promise<CompanyModel> {
    const { userId, body } = params;
    body.document = removeMaskUtil(body.document, 'cnpj');

    await this.thereIsNoDocumentOrThrowError(body.document);

    await this.userService.updateUserPermission(userId, 'MASTER');

    return await this.companyRepository.createCompany({
      userId,
      name: body.name,
      document: body.document,
      corporateName: body.corporateName,
      tradingName: body.tradingName ?? ''
    });
  }
}
