import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';

import { Lists } from 'ngx-bit';

@Directive({
  selector: 'button[bitSearchClear]'
})
export class BitSearchClearDirective {
  @Input() bitSearchClear!: Lists;
  @Input() bitReset?: Record<string, any>;
  @Output() readonly bitAfter: EventEmitter<undefined> = new EventEmitter<undefined>();

  @HostListener('click')
  onClick(): void {
    this.bitSearchClear.clearSearch(this.bitReset).subscribe(() => {
      this.bitAfter.emit(undefined);
    });
  }
}
