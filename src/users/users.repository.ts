import { Injectable } from '@nestjs/common';
import { Prisma, User as UserModel } from '@prisma/client';
import { PrismaService } from '~/common/service';
import { UserResponse } from './interfaces';

@Injectable()
export class UsersRepository {
  constructor(private readonly prismaService: PrismaService) {}

  static exclude<User, Key extends keyof User>(
    user: User,
    ...keys: Key[]
  ): Omit<User, Key> {
    for (const key of keys) {
      // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
      delete user[key];
    }
    return user;
  }

  async createUser(
    data: Prisma.UserUncheckedCreateInput
  ): Promise<UserResponse> {
    const user = await this.prismaService.user.create({
      data
    });

    return UsersRepository.exclude(user, 'password');
  }

  async getAll(params: {
    where?: Prisma.UserWhereInput;
    include?: Prisma.UserInclude;
  }): Promise<UserModel[]> {
    const { where, include } = params;
    return await this.prismaService.user.findMany({
      where,
      include
    });
  }

  async update(params: {
    data: Prisma.UserUncheckedUpdateManyInput;
    where: Prisma.UserWhereInput;
  }): Promise<Prisma.BatchPayload> {
    const { data, where } = params;
    return await this.prismaService.user.updateMany({
      data,
      where
    });
  }
}
