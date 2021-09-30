import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';

import { WpxData } from '@weplanx/ngx';

@Directive({
  selector: 'button[wpxSearchClear]'
})
export class WpxSearchClearDirective {
  @Input() bitSearchClear!: WpxData;
  @Input() bitReset?: Record<string, any>;
  @Output() readonly bitAfter: EventEmitter<undefined> = new EventEmitter<undefined>();

  @HostListener('click')
  onClick(): void {
    this.bitSearchClear.clearSearch(this.bitReset).subscribe(() => {
      this.bitAfter.emit(undefined);
    });
  }
}
