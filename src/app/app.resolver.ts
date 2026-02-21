import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';

import { Layout } from '@shared/models/layout';

@Injectable({ providedIn: 'root' })
export class AppResolver implements Resolve<Layout> {
  private http = inject(HttpClient);

  resolve(): Observable<Layout> {
    return this.http.get<Layout>('layout');
  }
}
