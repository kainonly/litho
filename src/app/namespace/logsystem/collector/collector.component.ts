import { Component } from '@angular/core';

import { AnyDto } from '@weplanx/ng';

@Component({
  selector: 'app-logsystem-collector',
  templateUrl: './collector.component.html'
})
export class CollectorComponent {
  /**
   * 数据
   */
  items: Array<AnyDto<any>> = [];
}
