export interface EmployeesListRepositoryDataResponse {
  id: string;
  name: string | null;
  email: string | null;
  phone: string | null;
  occupation: string;
  specialty: string;
  createdAt: Date | null;
}

export interface EmployeesListRepositoryResponse {
  results: number;
  data: EmployeesListRepositoryDataResponse[];
}
