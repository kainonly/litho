import { Directive, HostListener } from '@angular/core';

import { BitService } from 'ngx-bit';

@Directive({
  selector: '[bitBack]'
})
export class BitBackDirective {
  constructor(private bit: BitService) {}

  @HostListener('click')
  onClick(): void {
    this.bit.back();
  }
}
