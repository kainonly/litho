import { Directive, HostListener } from '@angular/core';

import { Bit } from 'ngx-bit';

@Directive({
  selector: '[bitBack]'
})
export class BitBackDirective {
  constructor(private bit: Bit) {}

  @HostListener('click')
  onClick(): void {
    this.bit.back();
  }
}
