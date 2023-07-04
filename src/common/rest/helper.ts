import { Params } from '../http/params';
import { HttpOptions, Filter, RestOptions } from '../types';

export const useOptions = <T>(
  filter?: Filter<T>,
  options?: RestOptions<T>
): Pick<HttpOptions<never>, 'headers' | 'params'> => {
  const headers = new Headers();
  if (options?.page) {
    headers.set('x-page', options.page.toString());
  }
  if (options?.pagesize) {
    headers.set('x-pagesize', options.pagesize.toString());
  }
  const params = new Params();
  if (filter) {
    params.set('filter', JSON.stringify(filter));
  }
  if (options?.keys) {
    options.keys.forEach(v => params.append('keys', v as string));
  }
  if (options?.sort) {
    options.sort.forEach((v, k) => {
      params.append('sort', `${k as string}:${v}`);
    });
  }
  if (options?.xfilter && Object.keys(options.xfilter).length !== 0) {
    params.set('format', JSON.stringify(options.xfilter));
  }
  return { headers, params };
};
