import { EmployeesListRepositoryDataResponse } from '~/employees/interfaces/employees-list-repository-response.interface';

export interface EmployeesListResponse {
  totalPages: number;
  page: number;
  results: number;
  employees: EmployeesListRepositoryDataResponse[];
}
