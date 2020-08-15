import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { NzNotificationService, NzSwitchComponent } from 'ng-zorro-antd';
import { Observable } from 'rxjs';
import { BitService } from 'ngx-bit';

@Directive({
  selector: '[bitStatusChange]'
})
export class BitStatusChangeDirective {
  @Input() bitStatusChange: Observable<any>;
  @Input() bitControl = false;
  @Output() response: EventEmitter<any> = new EventEmitter();

  constructor(
    private bit: BitService,
    private nzSwitchComponent: NzSwitchComponent,
    private notificationService: NzNotificationService
  ) {
    nzSwitchComponent.nzControl = true;
  }

  @HostListener('click')
  onClick() {
    this.bitStatusChange.subscribe(res => {
      if (!res.error) {
        this.notificationService.success(this.bit.l.operateSuccess, this.bit.l.statusSuccess);
      } else {
        if (this.bitControl) {
          this.response.emit(res);
        } else {
          this.notificationService.error(this.bit.l.operateError, this.bit.l.statusError);
        }
      }
    });
  }
}
