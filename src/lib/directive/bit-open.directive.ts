import {Directive, HostListener, Input} from '@angular/core';
import {BitService} from '../base/bit.service';

@Directive({
  selector: '[bitOpen]'
})
export class BitOpenDirective {
  @Input() bitOpen: any[];
  @Input() bitTrigger = 'click';

  constructor(
    private bit: BitService
  ) {
  }

  @HostListener('click')
  click() {
    if (this.bitTrigger === 'click') {
      this.bit.open(this.bitOpen);
    }
  }

  @HostListener('touchstart')
  touch() {
    if (this.bitTrigger === 'touch') {
      this.bit.open(this.bitOpen);
    }
  }
}
