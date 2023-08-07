import { Injectable } from '@angular/core';
import { Observable, switchMap, timer } from 'rxjs';
import { map } from 'rxjs/operators';

import { Project } from '@common/models/project';
import { Any, WpxApi } from '@weplanx/ng';

@Injectable({ providedIn: 'root' })
export class ProjectsService extends WpxApi<Project> {
  protected override collection = 'projects';

  existsNamespace(namespace: string): Observable<Any> {
    return timer(500).pipe(
      switchMap(() => this.exists({ namespace })),
      map(v => (v ? { error: true, duplicated: v } : null))
    );
  }
}
