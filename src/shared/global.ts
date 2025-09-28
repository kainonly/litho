import { HttpClient, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Observable } from 'rxjs';

import { StorageMap } from '@ngx-pwa/local-storage';
import { Api } from '@shared/apis';
import { Basic, R, SearchOption } from '@shared/models';

import { Model } from './utils/model';

@Injectable({ providedIn: 'root' })
export class Global {
  private http = inject(HttpClient);
  private storage = inject(StorageMap);
  private modal = inject(NzModalService);

  setModel<T extends Basic, S extends SearchOption>(storageKey: string, api: Api<T>, search: S): Model<T, S> {
    return new Model<T, S>(storageKey, this.storage, api, search);
  }

  login(code: string, password: string): Observable<R> {
    return this.http.post('login', { code, password });
  }

  verify(): Observable<HttpResponse<R>> {
    return this.http.get('verify', { observe: 'response' });
  }

  logout(): Observable<R> {
    return this.http.post('logout', {});
  }
}
