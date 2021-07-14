import { Directive, HostListener, Input } from '@angular/core';
import { NavigationExtras } from '@angular/router';
import { Bit } from 'ngx-bit';

@Directive({
  selector: '[bitOpen]'
})
export class BitOpenDirective {
  @Input() bitOpen!: any[];
  @Input() extras?: NavigationExtras;

  constructor(private bit: Bit) {}

  @HostListener('click')
  onClick(): void {
    this.bit.open(this.bitOpen, this.extras);
  }
}
