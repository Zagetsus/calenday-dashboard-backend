import { Injectable } from '@nestjs/common';
import { Prisma, User as UserModel, UserPermissionEnum } from '@prisma/client';
import { hash } from 'bcryptjs';
import { company } from 'faker';
import { AppLogger } from '~/app.logger';
import { UnexpectedError } from '~/common/errors';
import { PrismaService } from '~/common/service';
import { removeMaskUtil } from '~/common/utils';
import { UserParams, UserResponse } from './interfaces';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(
    private readonly logger: AppLogger,
    private readonly userRepository: UsersRepository,
    private readonly prisma: PrismaService
  ) {
    this.logger.setContext(UsersService.name);
  }

  async getUser(userWhereUniqueInput: Prisma.UserWhereUniqueInput) {
    const user: any = await this.prisma.user.findUnique({
      where: userWhereUniqueInput,
      include: {
        company: {
          select: {
            id: true,
            name: true,
            corporateName: true,
            tradingName: true
          }
        },
        employees: {
          select: {
            id: true
          }
        }
      }
    });

    const { company, employees, ...rest } = user;

    const hasCompany = !!company.length;
    const hasEmployee = !!employees.length;

    return {
      ...rest,
      company: hasCompany ? company[0] : null,
      employee: hasEmployee ? employees[0] : null
    };
  }

  async existsEmail(email: string) {
    const users = await this.userRepository.getAll({
      where: {
        email
      }
    });

    const hasUser = !!users.length;

    if (hasUser) {
      const errorMessage = 'email already exists';
      this.logger.fail({
        category: 'USER_SERVICE_ERROR',
        error: errorMessage
      });
      throw new UnexpectedError(errorMessage);
    }

    return hasUser;
  }

  async existsCPF(document: string) {
    const users = await this.userRepository.getAll({
      where: {
        document
      }
    });

    const hasUser = !!users.length;

    if (hasUser) {
      const errorMessage = 'CPF already exists';
      this.logger.fail({
        category: 'USER_SERVICE_ERROR',
        error: errorMessage
      });
      throw new UnexpectedError(errorMessage);
    }

    return hasUser;
  }

  async createUser(params: UserParams): Promise<UserResponse> {
    params.document = removeMaskUtil(params.document, 'cpf');

    await this.existsCPF(params.document);

    if (params.email) {
      await this.existsEmail(params.email);
    }

    if (params.password) {
      params.password = await hash(params.password, 8);
    }

    const config = {
      name: params.name,
      email: params.email,
      password: params.password,
      document: params.document,
      phone: removeMaskUtil(params.phone, 'phone'),
      birthDate: params?.birthDate
    };

    return await this.userRepository.createUser(config);
  }

  async updateUserPermission(
    userId: string,
    permission: UserPermissionEnum
  ): Promise<void> {
    await this.userRepository.update({
      data: {
        permission
      },
      where: {
        id: userId
      }
    });
  }
}
