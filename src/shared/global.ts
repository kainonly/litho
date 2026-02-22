import { HttpClient, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Observable } from 'rxjs';

import { StorageMap } from '@ngx-pwa/local-storage';
import { Api } from '@shared/apis';
import { Any, Basic, R, SearchOption } from '@shared/models';
import { Nav } from '@shared/models/nav';

import { toM } from './utils/helper';
import { Model } from './utils/model';

@Injectable({ providedIn: 'root' })
export class Global {
  private http = inject(HttpClient);
  private storage = inject(StorageMap);
  private modal = inject(NzModalService);

  readonly navs: Nav[] = [
    { key: 'index', name: '运营中心', icon: 'desktop', link: 'index' },
    { key: 'business', name: '业务对象', icon: 'inbox', link: 'business' },
    { key: 'analysis', name: '数据报表', icon: 'fund-view', link: 'analysis' },
    { key: 'system', name: '系统设置', icon: 'setting', link: 'system' }
  ];
  navM = toM(this.navs, item => item.key);

  setModel<T extends Basic, S extends SearchOption>(storageKey: string, api: Api<T>, search: S): Model<T, S> {
    return new Model<T, S>(storageKey, this.storage, api, search);
  }

  deleteConfirm(content: string, onOk: () => void): void {
    this.modal.confirm({
      nzTitle: `您确定删除该数据吗?`,
      nzContent: content,
      nzOkText: `是的`,
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => onOk(),
      nzCancelText: `再想想`
    });
  }

  bulkDeleteConfirm(onOk: () => void): void {
    this.modal.confirm({
      nzTitle: `您确定删除当前选中的数据吗?`,
      nzOkText: `是的`,
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => onOk(),
      nzCancelText: `再想想`
    });
  }

  login(dto: Any): Observable<R> {
    return this.http.post('login', dto);
  }

  verify(): Observable<HttpResponse<R>> {
    return this.http.get('verify', { observe: 'response' });
  }

  logout(): Observable<R> {
    return this.http.post('logout', {});
  }
}
