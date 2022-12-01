import { Injectable } from '@nestjs/common';
import {
  Prisma,
  Product as ProductModel,
  ProductCategory
} from '@prisma/client';
import { PrismaService } from '~/common/service';

@Injectable()
export class ProductsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async createProduct(data: Prisma.ProductUncheckedCreateInput) {
    return this.prismaService.product.create({ data });
  }

  async getProducts(params: {
    where?: Prisma.ProductWhereInput;
    take?: number;
    skip?: number;
  }) {
    const { where, take, skip } = params;

    const [total, products] = await this.prismaService.$transaction([
      this.prismaService.product.count(),
      this.prismaService.product.findMany({
        include: { category: true },
        where,
        take,
        skip
      })
    ]);

    return {
      results: total,
      data: parseGetProducts(products)
    };
  }
}

function parseGetProducts(
  products: Array<ProductModel & { category: ProductCategory }>
) {
  return products.map(product => ({
    id: product.id,
    reference: product.reference,
    name: product.name,
    status: product.status,
    brand: product.brand,
    price: product.price,
    stock: product.stock,
    type: product.type,
    category: product.category.name,
    companyId: product.companyId,
    createdAt: product.createdAt,
    updatedAt: product.updatedAt,
    deletedAt: product.deletedAt
  }));
}
