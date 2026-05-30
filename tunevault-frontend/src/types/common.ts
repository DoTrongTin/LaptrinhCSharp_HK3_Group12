export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  errors: string[];
}

export interface PaginatedResult<T> {
  items: T[];
  page: number;
  totalPages: number;
  totalCount: number;
}
