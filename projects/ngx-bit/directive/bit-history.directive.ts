import { Directive, HostListener, Input } from '@angular/core';
import { BitService } from 'ngx-bit';

@Directive({
  selector: '[bitHistory]'
})
export class BitHistoryDirective {
  @Input() bitHistory!: string;

  constructor(private bit: BitService) {}

  @HostListener('click')
  onClick(): void {
    this.bit.history(this.bitHistory);
  }
}
