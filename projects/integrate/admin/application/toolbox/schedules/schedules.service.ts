import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Api } from '@weplanx/ng';

import { Schedule, ScheduleJob } from './types';

@Injectable()
export class SchedulesService extends Api<Schedule> {
  protected override model = 'schedules';

  /**
   * 设置任务
   * @param id
   * @param jobs
   */
  setJobs(id: string, jobs: ScheduleJob[]): Observable<any> {
    return this.updateOneById(id, {
      $set: { jobs }
    });
  }

  /**
   * 获取服务中的唯一标识
   */
  getKeys(): Observable<string[]> {
    return this.http.get<string[]>(this.url('keys'));
  }
}
