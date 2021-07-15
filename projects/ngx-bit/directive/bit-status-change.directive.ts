import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';

import { InputBoolean } from 'ng-zorro-antd/core/util';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzSwitchComponent } from 'ng-zorro-antd/switch';
import { ApiResponse, BitService } from 'ngx-bit';

@Directive({
  selector: 'nz-switch[bitStatusChange]'
})
export class BitStatusChangeDirective {
  @Input() bitStatusChange!: Observable<unknown>;
  @Input() @InputBoolean() bitControl = false;
  @Output() readonly bitResponse?: EventEmitter<unknown>;

  constructor(nzSwitchComponent: NzSwitchComponent, private bit: BitService, private message: NzMessageService) {
    nzSwitchComponent.nzControl = true;
    if (this.bitControl) {
      this.bitResponse = new EventEmitter<unknown>();
    }
  }

  @HostListener('click')
  onclick(): void {
    this.bitStatusChange!.subscribe(data => {
      const response = data as ApiResponse;
      if (!response.error) {
        this.message.success(this.bit.l.StatusSuccess as string);
      } else {
        if (this.bitControl) {
          this.bitResponse!.emit(response);
        } else {
          this.message.error(this.bit.l.StatusError as string);
        }
      }
    });
  }
}
