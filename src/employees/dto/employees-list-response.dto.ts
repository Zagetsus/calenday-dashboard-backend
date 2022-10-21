import { ApiProperty } from '@nestjs/swagger';
import { snakeKeys } from '~/common/utils';

export class EmployeesListResponseDto {
  @ApiProperty({
    type: Array,
    description: 'Array de funcionários',
    example: [
      {
        id: '53f6264d-0608-457c-83cb-eb9ee8a849f9',
        name: 'Reuben Larson',
        email: 'Myles64@yahoo.com',
        phone: '15444362775',
        occupation: 'MANAGER',
        specialty: 'Manicure',
        created_at: '2022-09-28T00:26:52.505Z'
      }
    ],
    required: true
  })
  employees: Array<{
    id: string;
    name: string;
    email: string;
    phone: string;
    occupation: string;
    specialty: string;
    createdAt: string;
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
    const newListEmployees = data.map(snakeKeys);

    return {
      employees: newListEmployees,
      meta: {
        results,
        current_page: currentPage,
        total_pages: totalPages
      }
    };
  }
}
