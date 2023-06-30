import { Options } from './types';

export class HttpClient {
  baseURL: string = 'api';

  headers: Headers = new Headers({
    'Content-Type': 'application/json'
  });

  async request<R>(method: string, url: string, options: Options = { responseType: 'json' }): Promise<Response | R> {
    const init: RequestInit = {
      method,
      headers: this.headers
    };
    options.header?.forEach((value, key) => {
      (init.headers as Headers).set(key, value);
    });
    if (options.body) {
      init.body = JSON.stringify(options.body);
    }
    const input = `${this.baseURL}/${url}${options.params ? `?${options.params.toQuery()}` : ''}`;
    const response = await fetch(input, init);
    switch (options?.responseType) {
      case 'none':
        return response;
      case 'json':
      default:
        return response.json() as R;
    }
  }

  head(url: string, options?: Omit<Options, 'body' | 'responseType'>): Promise<Response> {
    return this.request('HEAD', url, {
      responseType: 'none',
      ...options
    });
  }

  get<R>(url: string, options?: Omit<Options, 'body'>): Promise<Response | R> {
    return this.request('GET', url, {
      ...options
    });
  }

  post<R, D>(url: string, body: D, options?: Omit<Options, 'body'>): Promise<Response | R> {
    return this.request('POST', url, {
      body,
      ...options
    });
  }

  put<R, D>(url: string, body: D, options?: Omit<Options, 'body'>): Promise<Response | R> {
    return this.request('PUT', url, {
      body,
      ...options
    });
  }

  patch<R, D>(url: string, body: Partial<D>, options?: Omit<Options, 'body'>): Promise<Response | R> {
    return this.request('PATCH', url, {
      body,
      ...options
    });
  }

  delete<R>(url: string, options?: Omit<Options, 'body'>): Promise<Response | R> {
    return this.request('DELETE', url, {
      ...options
    });
  }
}
