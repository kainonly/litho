import { Directive, HostListener, Input } from '@angular/core';
import { Bit } from 'ngx-bit';

@Directive({
  selector: '[bitHistory]'
})
export class BitHistoryDirective {
  @Input() bitHistory!: string;

  constructor(private bit: Bit) {}

  @HostListener('click')
  onClick(): void {
    this.bit.history(this.bitHistory);
  }
}
