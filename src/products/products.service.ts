import { Injectable } from '@nestjs/common';
import { AppLogger } from '~/app.logger';
import { ProductsRepository } from '~/products/products.repository';

@Injectable()
export class ProductsService {
  constructor(
    private readonly productRepository: ProductsRepository,
    private readonly logger: AppLogger
  ) {
    this.logger.setContext(ProductsService.name);
  }

  getTotalPagesRounded(totalLines: number, limitLines: number): number {
    const totalPages = Number(totalLines) || 1;
    return Math.ceil(totalPages / limitLines);
  }

  async createProduct(params: any) {
    const { companyId, data } = params;

    return await this.productRepository.createProduct({
      companyId,
      reference: data.reference,
      name: data.name,
      status: data.status,
      brand: data.brand,
      price: data.price,
      stock: data.stock,
      type: data.type,
      categoryId: data.categoryId
    });
  }

  async getAllProducts(params: any): Promise<any> {
    const { companyId, skip, take } = params;
    const skipCalculated = (skip - 1) * take;
    const products = await this.productRepository.getProducts({
      where: {
        companyId
      },
      skip: skipCalculated,
      take
    });

    return {
      totalPages: this.getTotalPagesRounded(products.results, take),
      page: skip,
      results: products.results,
      products: products.data
    };
  }
}
