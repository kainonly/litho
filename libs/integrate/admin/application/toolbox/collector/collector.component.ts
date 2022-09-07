import { Component } from '@angular/core';

import { AnyDto } from '@weplanx/ng';

import { Schedule } from '../schedules/types';

@Component({
  selector: 'wpx-admin-toolbox-collector',
  templateUrl: './collector.component.html'
})
export class CollectorComponent {
  /**
   * 数据
   */
  items: Array<AnyDto<Schedule>> = [];
}
