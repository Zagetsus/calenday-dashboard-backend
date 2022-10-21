import { Injectable, OnModuleInit } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { IS_DEV } from '~/app.vars';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    let options: any;
    if (IS_DEV) {
      options = {
        log: [
          { emit: 'event', level: 'query' },
          { emit: 'stdout', level: 'info' },
          { emit: 'stdout', level: 'warn' },
          { emit: 'stdout', level: 'error' }
        ],
        errorFormat: 'colorless'
      };
    }
    super(options);
  }

  async onModuleInit() {
    const handleQueryEvent = (event: Prisma.QueryEvent) => {
      console.log(`Query: ${event.query}`);
      console.log(`Params: ${event.params}`);
      console.log(`Duration: ${event.duration}ms`);
    };

    const handleSoftDelete = async (
      params: Prisma.MiddlewareParams,
      next: (params: Prisma.MiddlewareParams) => void
    ) => {
      const isDeleteAction = params.action === 'delete';
      const isDeleteManyAction = params.action === 'deleteMany';
      const isFindUniqueAction = params.action === 'findUnique';
      const isFindFirstAction = params.action === 'findFirst';
      const isFindManyAction = params.action === 'findMany';
      const hasDeleteCondition = !!params.args.where?.deletedAt;
      const hasData = !!params.args.data;

      if (isDeleteAction) {
        params.action = 'update';
        params.args.data = { deletedAt: new Date() };
      }
      if (isDeleteManyAction) {
        params.action = 'updateMany';
        if (hasData) {
          params.args.data.deletedAt = new Date();
        } else {
          params.args.data = { deletedAt: new Date() };
        }
      }

      if (isFindUniqueAction || isFindFirstAction) {
        params.action = 'findFirst';
        params.args.where.deletedAt = null;
      }
      if (isFindManyAction) {
        if (params.args.where) {
          if (!hasDeleteCondition) {
            params.args.where.deletedAt = null;
          }
        } else {
          params.args.where = { deletedAt: null };
        }
      }
      return next(params);
    };

    this.$on<any>('query', handleQueryEvent);
    this.$use(handleSoftDelete);
  }
}
