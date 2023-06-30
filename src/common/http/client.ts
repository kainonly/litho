import { DefaultOptions, Options } from './types';

export class HttpClient {
  /**
   * @example https://api.example.com
   */
  baseURL: string;

  /**
   * options default
   */
  default: DefaultOptions;

  constructor(baseURL?: string, options?: DefaultOptions) {
    this.baseURL = baseURL ?? 'api';
    this.default = options ?? {
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      responseType: 'json'
    };
  }

  async request<R, D>(method: string, url: string, options: Options<D>): Promise<Response | R> {
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
        return response;
      case 'json':
      default:
        return response.json() as R;
    }
  }

  head(url: string, options?: Omit<Options<never>, 'body' | 'responseType'>): Promise<Response> {
    return this.request('HEAD', url, {
      responseType: 'none',
      ...options
    });
  }

  get<R>(url: string, options?: Omit<Options<never>, 'body'>): Promise<Response | R> {
    return this.request('GET', url, {
      ...options
    });
  }

  post<R, D>(url: string, body: D, options?: Omit<Options<D>, 'body'>): Promise<Response | R> {
    return this.request('POST', url, {
      body,
      ...options
    });
  }

  put<R, D>(url: string, body: D, options?: Omit<Options<D>, 'body'>): Promise<Response | R> {
    return this.request('PUT', url, {
      body,
      ...options
    });
  }

  patch<R, D>(url: string, body: Partial<D>, options?: Omit<Options<D>, 'body'>): Promise<Response | R> {
    return this.request('PATCH', url, {
      body,
      ...options
    });
  }

  delete<R>(url: string, options?: Omit<Options<never>, 'body'>): Promise<Response | R> {
    return this.request('DELETE', url, {
      ...options
    });
  }
}
