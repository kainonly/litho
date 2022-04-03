import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Api } from '@weplanx/common';

import { Department } from './types';

@Injectable()
export class DepartmentsService extends Api<Department> {
  protected override model = 'department';

  findLabels(): Observable<string[]> {
    return this.http.get<string[]>(this.url('labels'));
  }
}
