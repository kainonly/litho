import { Component, inject, OnInit, signal } from '@angular/core';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';

import { FlagSet, SharedModule } from '@shared';
import { Cap } from '@shared/models';

export interface SetCapsInput {
  caps: Cap[];
  selected: string[];
}

@Component({
  imports: [SharedModule],
  selector: 'app-system-roles-strategy-set-caps',
  templateUrl: './set-caps.html'
})
export class SetCaps implements OnInit {
  input = inject<SetCapsInput>(NZ_MODAL_DATA);

  private modalRef = inject(NzModalRef);

  caps = signal<Cap[]>([]);
  selection = new FlagSet();

  ngOnInit(): void {
    console.log(this.input.selected);
    this.caps.set(this.input.caps);
    this.selection.reset(this.input.selected);
  }

  close(): void {
    this.modalRef.triggerCancel();
  }

  submit(): void {
    this.modalRef.triggerOk();
  }
}
