import {Directive, HostListener, Input} from '@angular/core';
import {BitService} from '../common/bit.service';

@Directive({
  selector: '[bitBack]'
})
export class BitBackDirective {
  @Input() bitTrigger = 'click';

  constructor(
    private bit: BitService
  ) {
  }

  @HostListener('click')
  click() {
    this.bit.back();
  }


  @HostListener('touchstart')
  touch() {
    if (this.bitTrigger === 'touch') {
      this.bit.back();
    }
  }
}
