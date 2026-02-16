export interface IPaginatedResponse<T> {
  data: T[];
  pagination: IPaginationMeta;
}

export interface IPaginationMeta {
  totalDocuments: number;
  totalPages: number;
  currentPage: number;
  perPage: number;
}

export interface IPagination {
  page?: number;
  limit?: number;
}
