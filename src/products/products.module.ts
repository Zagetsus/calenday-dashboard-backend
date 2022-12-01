import { Module } from '@nestjs/common';
import { AppLogger } from '~/app.logger';
import { PrismaService } from '~/common/service';
import { ProductsRepository } from '~/products/products.repository';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

@Module({
  providers: [ProductsService, ProductsRepository, PrismaService, AppLogger],
  controllers: [ProductsController]
})
export class ProductsModule {}
