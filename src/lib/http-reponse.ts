export interface HttpResponse<T> {
  data: T;
  meta?: {
    pagination: IPagination;
  };
  error?: {
    status: number;
    name: string;
    message: string;
    details?: IErrorDetails;
  };
}

export interface IErrorDetails {
  path: string[];
  message: string;
  name: string;
}

export interface IPagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}
