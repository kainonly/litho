import {Directive, HostListener} from '@angular/core';
import {BitService} from '../base/bit.service';

@Directive({
  selector: '[bitBack]'
})
export class BitBackDirective {
  constructor(private bit: BitService) {
  }

  @HostListener('click')
  onClick() {
    this.bit.back();
  }
}
