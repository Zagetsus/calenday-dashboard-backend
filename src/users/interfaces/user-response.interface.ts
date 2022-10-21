export interface UserResponse {
  id: string;
  name: string | null;
  email: string | null;
  phone: string | null;
  document: string | null;
  birthDate: Date | null;
  isActive: boolean;
  createdAt: Date | null;
  updatedAt: Date | null;
  deletedAt: null | Date;
}
