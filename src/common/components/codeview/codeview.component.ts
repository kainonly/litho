import { Component, Inject, OnInit } from '@angular/core';

import { Any } from '@weplanx/ng';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-codeview',
  templateUrl: './codeview.component.html'
})
export class CodeviewComponent implements OnInit {
  content = '';
  option: Any = {
    readOnly: true
  };

  constructor(
    @Inject(NZ_MODAL_DATA)
    public data: Any,
    private modalRef: NzModalRef
  ) {}

  ngOnInit(): void {
    try {
      const data = JSON.parse(this.data);
      this.option.language = 'json';
      this.content = JSON.stringify(data, null, 2);
    } catch (e) {
      this.content = this.data;
    }
  }

  close(): void {
    this.modalRef.triggerCancel();
  }
}
