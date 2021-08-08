export interface PaginationResponse {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: any[];
  support?: any;
}

export interface PageState {
  page: number;
  per_page: number;
  total?: number;
}
