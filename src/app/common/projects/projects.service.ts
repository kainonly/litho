import { Injectable } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { Project } from '@common/types';
import { WpxApi } from '@weplanx/ng';

@Injectable({ providedIn: 'root' })
export class ProjectsService extends WpxApi<Project> {
  protected override collection = 'projects';

  /**
   * 检查项目名称是否存在
   * @param name
   */
  existsName(name: string): Observable<any> {
    return timer(500).pipe(
      switchMap(() => this.exists({ name })),
      map(v => (v ? { error: true, duplicated: v } : null))
    );
  }

  /**
   * 检查命名空间是否存在
   * @param namespace
   */
  existsNamespace(namespace: string): Observable<any> {
    return timer(500).pipe(
      switchMap(() => this.exists({ namespace })),
      map(v => (v ? { error: true, duplicated: v } : null))
    );
  }
}
