import { ApiProperty } from '@nestjs/swagger';
import { ProductStatusEnum, ProductTypeEnum } from '@prisma/client';
import { snakeKeys } from '~/common/utils';

export class ProductResponseDTO {
  @ApiProperty({
    type: Array,
    description: 'Array de produtos',
    example: [
      {
        id: '010b32d0-0f04-4e33-8dbf-67db712b219d',
        reference: 'TEST123456',
        name: 'Shampoo Infusion',
        status: 'PUBLISHED',
        brand: 'Truss',
        price: '119.9',
        stock: 30,
        type: 'UNITY',
        category: 'Shampoo',
        company_id: '35635bb3-3d9e-450d-880f-645ea748cdf5',
        created_at: '2022-11-25T13:10:38.431Z',
        updated_at: '2022-11-25T13:10:38.432Z',
        deleted_at: null
      }
    ],
    required: true
  })
  products: Array<{
    id: string;
    reference: string;
    name: string;
    status: ProductStatusEnum;
    brand: string;
    price: number;
    stock: number;
    type: ProductTypeEnum;
    category: string;
    companyId: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: null;
  }>;

  @ApiProperty({
    type: Object,
    description:
      'Informações adicionais como total de resultados, página atual e total de páginas',
    example: {
      results: 26,
      current_page: 2,
      total_pages: 3
    }
  })
  meta: {
    results: number;
    currentPage: number;
    totalPages: number;
  };

  static factory({ data, results, totalPages, currentPage }) {
    const newListProducts = data.map(snakeKeys);

    return {
      products: newListProducts,
      meta: {
        results,
        current_page: currentPage,
        total_pages: totalPages
      }
    };
  }
}
