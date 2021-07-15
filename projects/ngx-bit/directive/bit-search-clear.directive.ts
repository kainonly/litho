import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';

import { ListByPage } from 'ngx-bit';

@Directive({
  selector: 'button[bitSearchClear]'
})
export class BitSearchClearDirective {
  @Input() bitSearchClear!: ListByPage;
  @Input() bitReset?: Record<string, unknown>;
  @Output() readonly bitAfter: EventEmitter<undefined> = new EventEmitter<undefined>();

  @HostListener('click')
  onClick(): void {
    this.bitSearchClear.clearSearch(this.bitReset).subscribe(() => {
      this.bitAfter.emit(undefined);
    });
  }
}
