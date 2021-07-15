import { Directive, HostListener, Input } from '@angular/core';
import { NavigationExtras } from '@angular/router';

import { BitService } from 'ngx-bit';

@Directive({
  selector: '[bitOpen]'
})
export class BitOpenDirective {
  @Input() bitOpen!: string[];
  @Input() bitExtras?: NavigationExtras;

  constructor(private bit: BitService) {}

  @HostListener('click')
  onClick(): void {
    this.bit.open(this.bitOpen, this.bitExtras);
  }
}
