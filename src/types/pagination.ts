export interface IPaginatedResponse<T> {
  data: T[];
  total: number;
  pages: number;
  page: number;
}

export interface IPaginationMeta {
  total: number;
  pages: number;
  page: number;
}

export interface IPagination {
  page?: number;
  limit?: number;
}
