import { Component, Inject, OnInit } from '@angular/core';

import { LogsetJob } from '@common/models/logset-job';
import { Any, AnyDto } from '@weplanx/ng';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-admin-workflows-response',
  templateUrl: './response.component.html'
})
export class ResponseComponent implements OnInit {
  content = '';
  option: Any = {
    readOnly: true
  };

  constructor(
    @Inject(NZ_MODAL_DATA)
    public data: AnyDto<LogsetJob>,
    private modalRef: NzModalRef
  ) {}

  ngOnInit(): void {
    try {
      const data = JSON.parse(this.data.response.body);
      this.option.language = 'json';
      this.content = JSON.stringify(data, null, 2);
    } catch (e) {
      this.content = this.data.body;
    }
  }

  close(): void {
    this.modalRef.triggerCancel();
  }
}
