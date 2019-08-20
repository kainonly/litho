import {Directive, HostListener, Input} from '@angular/core';
import {BitService} from '../common/bit.service';

@Directive({
  selector: '[bitCrossLevel]'
})
export class BitCrossLevelDirective {
  @Input() bitCrossLevel: string;
  @Input() bitTrigger = 'click';

  constructor(
    private bit: BitService
  ) {
  }

  @HostListener('click')
  click() {
    if (this.bitTrigger === 'click') {
      this.bit.crossLevel(this.bitCrossLevel);
    }
  }

  @HostListener('touchstart')
  touch() {
    if (this.bitTrigger === 'touch') {
      this.bit.crossLevel(this.bitCrossLevel);
    }
  }
}
