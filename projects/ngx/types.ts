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

export interface Locale {
  id: string;
  name: string;
}

export interface ApiOption {
  baseUrl: string;
  model: string;
}

export interface ListsOption {
  id: string;
  where: Record<string, any>;
  sort?: Record<string, any>;
  limit?: number;
}

export interface APIResponse {
  code: number;
  data: Record<string, unknown>;
  message: string;
}
