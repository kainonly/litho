import { Injectable } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { WpxApi } from '@weplanx/ng';

import { Project } from '../types';

@Injectable({ providedIn: 'root' })
export class ProjectsService extends WpxApi<Project> {
  protected override collection = 'projects';

  existsName(name: string): Observable<any> {
    return timer(500).pipe(
      switchMap(() => this.exists({ name })),
      map(v => (v ? { error: true, duplicated: v } : null))
    );
  }

  existsNamespace(namespace: string): Observable<any> {
    return timer(500).pipe(
      switchMap(() => this.exists({ namespace })),
      map(v => (v ? { error: true, duplicated: v } : null))
    );
  }
}
