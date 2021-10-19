export type Upload = string | UploadOption;

export interface UploadOption {
  url: string;
  storage?: UploadStorage;
  fetchSigned?: string;
  fetchSignedMethod?: string;
  size?: number;
}

export interface UploadSignedResponse {
  filename: string;
  option: Record<string, any>;
}

export type UploadStorage = 'default' | 'oss' | 'obs' | 'cos';

export interface ApiOption {
  baseUrl: string;
  model: string;
}

export interface APIResponse<T> {
  code: number;
  data?: T;
  message: string;
}

export interface DataLists<T> {
  total: number;
  lists: T;
}

export interface ListsOption {
  id: string;
  where: Record<string, any>;
  sort?: Record<string, any>;
  limit?: number;
}
