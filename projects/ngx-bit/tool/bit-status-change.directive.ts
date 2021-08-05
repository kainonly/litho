import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';

import { InputBoolean } from 'ng-zorro-antd/core/util';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzSwitchComponent } from 'ng-zorro-antd/switch';
import { BitService } from 'ngx-bit';

@Directive({
  selector: 'nz-switch[bitStatusChange]'
})
export class BitStatusChangeDirective {
  @Input() bitStatusChange!: Observable<any>;
  @Input() @InputBoolean() bitControl = false;
  @Output() readonly bitResponse: EventEmitter<any> = new EventEmitter<any>();

  constructor(nzSwitchComponent: NzSwitchComponent, private bit: BitService, private message: NzMessageService) {
    nzSwitchComponent.nzControl = true;
  }

  @HostListener('click')
  onclick(): void {
    this.bitStatusChange!.subscribe(v => {
      if (!v.error) {
        this.message.success('您的请求提交成功，已更新数据状态');
      } else {
        if (this.bitControl) {
          this.bitResponse!.emit(v);
        } else {
          this.message.error('您的请求提交异常，请稍后再试');
        }
      }
    });
  }
}
