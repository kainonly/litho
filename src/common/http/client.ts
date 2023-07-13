import { DefaultHttpOptions, HttpOptions } from './types';

export class HttpClient {
  /**
   * @example https://api.example.com
   */
  baseURL: string;

  /**
   * options default
   */
  default: DefaultHttpOptions = {};

  constructor(baseURL?: string, options?: DefaultHttpOptions) {
    this.baseURL = baseURL ?? 'api';
    this.default.headers =
      options?.headers ??
      new Headers({
        'Content-Type': 'application/json'
      });
    this.default.responseType = options?.responseType ?? 'json';
  }

  async request<R, D>(method: string, url: string, options: HttpOptions<D>): Promise<R> {
    const init: RequestInit = { method };
    const opts = { ...this.default };
    options.headers?.forEach((value, key) => {
      opts.headers!.set(key, value);
    });
    Object.entries(options).forEach(([key, value]) => {
      if (key !== 'headers') {
        Reflect.set(opts, key, value);
      }
    });
    if (options.body) {
      if (opts.headers!.get('Content-Type') === 'application/json') {
        init.body = JSON.stringify(options.body);
      } else {
        init.body = options.body as FormData | URLSearchParams;
      }
    }
    init.headers = opts.headers;
    // TODO: Interceptors...
    const input = `${this.baseURL}/${url}${options.params ? `?${options.params.toQuery()}` : ''}`;
    const response = await fetch(input, init);
    switch (opts.responseType) {
      case 'none':
        return response as R;
      case 'json':
      default:
        return response.json() as R;
    }
  }

  head(url: string, options?: Omit<HttpOptions<never>, 'body' | 'responseType'>): Promise<never> {
    return this.request('HEAD', url, {
      responseType: 'none',
      ...options
    });
  }

  get<R>(url: string, options?: Omit<HttpOptions<never>, 'body'>): Promise<R> {
    return this.request('GET', url, {
      ...options
    });
  }

  post<R, D>(url: string, body: D, options?: Omit<HttpOptions<D>, 'body'>): Promise<R> {
    return this.request('POST', url, {
      body,
      ...options
    });
  }

  put<R, D>(url: string, body: D, options?: Omit<HttpOptions<D>, 'body'>): Promise<R> {
    return this.request('PUT', url, {
      body,
      ...options
    });
  }

  patch<R, D>(url: string, body: Partial<D>, options?: Omit<HttpOptions<D>, 'body'>): Promise<R> {
    return this.request('PATCH', url, {
      body,
      ...options
    });
  }

  delete<R>(url: string, options?: Omit<HttpOptions<never>, 'body'>): Promise<R> {
    return this.request('DELETE', url, {
      ...options
    });
  }
}
