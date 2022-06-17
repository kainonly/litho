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
   * 列出配置唯一标识
   */
  list(): Observable<string[]> {
    return this.http.get<string[]>(this.url(''));
  }

  /**
   * 获取服务配置与状态
   * @param key
   */
  get(key: string): Observable<any> {
    return this.http.get(this.url(key));
  }

  /**
   * 同步服务配置
   * @param id
   */
  setSync(id: string): Observable<any> {
    return this.http.post(this.url('sync'), { id });
  }
}
