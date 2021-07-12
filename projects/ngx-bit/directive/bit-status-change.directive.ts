import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { NzSwitchComponent } from 'ng-zorro-antd/switch';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Observable } from 'rxjs';
import { BitService } from 'ngx-bit';

@Directive({
  selector: 'nz-switch[bitStatusChange]'
})
export class BitStatusChangeDirective {
  @Input() bitStatusChange: Observable<any>;
  @Input() bitControl = false;
  @Output() response: EventEmitter<any> = new EventEmitter();

  constructor(
    nzSwitchComponent: NzSwitchComponent,
    private bit: BitService,
    private message: NzMessageService
  ) {
    nzSwitchComponent.nzControl = true;
  }

  @HostListener('click')
  onclick(): void {
    this.bitStatusChange.subscribe(res => {
      if (!res.error) {
        this.message.success(this.bit.l.StatusSuccess);
      } else {
        if (!this.bitControl) {
          this.message.error(this.bit.l.StatusError);
        } else {
          this.response.emit(res);
        }
      }
    });
  }
}
