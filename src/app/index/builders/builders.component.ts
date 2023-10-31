import { Component } from '@angular/core';

import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-index-builders',
  templateUrl: './builders.component.html'
})
export class BuildersComponent {
  constructor(
    private modal: NzModalService,
    private message: NzMessageService
  ) {}
}
