import { Directive, HostListener, Input } from '@angular/core';
import { BitService } from 'ngx-bit';

@Directive({
  selector: '[bitCrossLevel]'
})
export class BitCrossLevelDirective {
  @Input() bitCrossLevel: string;

  constructor(
    private bit: BitService
  ) {
  }

  @HostListener('click')
  onClick(): void {
    this.bit.crossLevel(this.bitCrossLevel);
  }
}
