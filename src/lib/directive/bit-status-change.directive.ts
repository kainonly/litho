import {Directive, EventEmitter, HostListener, Input, Output} from '@angular/core';
import {NzNotificationService, NzSwitchComponent} from 'ng-zorro-antd';
import {Observable} from 'rxjs';
import {BitService} from '../base/bit.service';

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
    nzSwitchComponent.nzCheckedChildren = bit.l.get('on');
    nzSwitchComponent.nzUnCheckedChildren = bit.l.get('off');
  }

  @HostListener('click')
  onClick() {
    this.bitStatusChange.subscribe(res => {
      if (!res.error) {
        this.notificationService.success(this.bit.l.get('operateSuccess'), this.bit.l.get('statusSuccess'));
      } else {
        if (this.bitControl) {
          this.response.emit(res);
        } else {
          this.notificationService.error(this.bit.l.get('operateError'), this.bit.l.get('statusError'));
        }
      }
    });
  }
}
