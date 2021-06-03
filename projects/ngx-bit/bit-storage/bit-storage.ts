import { Observable } from 'rxjs';

declare let localforage: any;

export const storage = {
  /**
   * 从仓库中获取 key 对应的值并将结果提供给回调函数
   * Gets an item from the storage library and supplies the result to a callback.
   */
  get(key: string): Observable<any> {
    return new Observable(observer => {
      localforage.ready()
        .then(() => localforage.getItem(key))
        .then(value => {
          observer.next(value);
          observer.complete();
        })
        .catch(e => {
          observer.error(e);
        });
    });
  },
  /**
   * 将数据保存到离线仓库
   * Saves data to an offline store.
   */
  set(key: string, value: any): Observable<any> {
    return new Observable(observer => {
      localforage.ready()
        .then(() => localforage.setItem(key, value))
        .then(_ => {
          observer.next(true);
          observer.complete();
        })
        .catch(e => {
          observer.error(e);
        });
    });
  },
  /**
   * 从离线仓库中删除 key 对应的值
   * Removes the value of a key from the offline store.
   */
  remove(key: string): Observable<any> {
    return new Observable(observer => {
      localforage.ready()
        .then(() => localforage.removeItem(key))
        .then(_ => {
          observer.next(true);
          observer.complete();
        })
        .catch(e => {
          observer.error(e);
        });
    });
  },
  /**
   * 从数据库中删除所有的 key，重置数据库
   * Removes every key from the database, returning it to a blank slate.
   */
  clear(): Observable<any> {
    return new Observable(observer => {
      localforage.ready()
        .then(() => localforage.clear())
        .then(_ => {
          observer.next(true);
          observer.complete();
        })
        .catch(e => {
          observer.error(e);
        });
    });
  },
  /**
   * 获取数据仓库中所有的 key
   * Get the list of all keys in the datastore.
   */
  keys(): Observable<any> {
    return new Observable(observer => {
      localforage.ready()
        .then(() => localforage.keys())
        .then(value => {
          observer.next(value);
          observer.complete();
        })
        .catch(e => {
          observer.error(e);
        });
    });
  }
};
