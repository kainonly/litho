/* eslint-disable react-hooks/rules-of-hooks */
import { Params } from '../http/params';
import { HttpClient } from '../http/client';
import {
  AnyDto,
  BulkDeleteOption,
  CreateOption,
  DeleteOption,
  Filter,
  FilterOption,
  FindByIdOption,
  FindOneOption,
  FindOption,
  R,
  ReplaceOption,
  SortOption,
  UpdateOneByIdOption,
  UpdateOption
} from '../types';
import { useOptions } from './helper';

export class REST<T> {
  client!: HttpClient;

  constructor(client: HttpClient) {
    this.client = client;
  }

  create(doc: T, options?: CreateOption<T>): Promise<R> {
    return this.client.post(``, {
      data: doc,
      format: options?.xdata,
      txn: options?.txn
    });
  }

  bulkCreate(docs: T[], options?: CreateOption<T>): Promise<R> {
    return this.client.post(`bulk_create`, {
      data: docs,
      format: options?.xdata,
      txn: options?.txn
    });
  }

  async size(filter?: Filter<T>, options?: FilterOption<T>): Promise<number> {
    const response = await this.client.get<Response>(`_size`, {
      responseType: 'none',
      ...useOptions<T>(filter, options)
    });
    return Number(response.headers.get('x-tootal')!);
  }

  async exists(filter: Filter<T>, options?: FilterOption<T>): Promise<boolean> {
    return (await this.size(filter, options)) !== 0;
  }

  find(filter: Filter<T>, options?: FindOption<T>): Promise<Array<AnyDto<T>>> {
    return this.client.get<Array<AnyDto<T>>>(``, useOptions<T>(filter, options));
  }

  findOne(filter: Filter<T>, options?: FindOneOption<T>): Promise<AnyDto<T>> {
    return this.client.get<AnyDto<T>>(`_one`, useOptions<T>(filter, options));
  }

  findById(id: string, options?: FindByIdOption<T>): Promise<AnyDto<T>> {
    return this.client.get<AnyDto<T>>(id, useOptions<T>(undefined, options));
  }

  update(filter: Filter<T>, update: R, options?: UpdateOption<T>): Promise<R> {
    return this.client.patch(
      ``,
      {
        data: update,
        format: options?.xdata,
        txn: options?.txn
      },
      useOptions<T>(filter, options)
    );
  }

  updateById(id: string, update: R, options?: UpdateOneByIdOption<T>): Promise<R> {
    return this.client.patch(id, {
      data: update,
      format: options?.xdata,
      txn: options?.txn
    });
  }

  replace(id: string, doc: T, options?: ReplaceOption<T>): Promise<R> {
    return this.client.put(id, {
      data: doc,
      format: options?.xdata,
      txn: options?.txn
    });
  }

  delete(id: string, options?: DeleteOption<T>): Promise<R> {
    const params = new Params();
    if (options?.txn) {
      params.set('txn', options.txn);
    }
    return this.client.delete(id, { params });
  }

  bulkDelete(filter: Filter<T>, options?: BulkDeleteOption<T>): Promise<R> {
    return this.client.post(`bulk_delete`, {
      data: filter,
      format: options?.xfilter,
      txn: options?.txn
    });
  }

  sort(key: string, values: string[], options?: SortOption<T>): Promise<R> {
    return this.client.post(`sort`, {
      data: { key, values },
      txn: options?.txn
    });
  }
}
