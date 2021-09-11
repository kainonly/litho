import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';

import { Lists } from 'ngx-bit';

@Directive({
  selector: '[bitSearchStart]'
})
export class BitSearchStartDirective {
  @Input() bitSearchStart!: Lists;
  @Output() readonly bitAfter: EventEmitter<undefined> = new EventEmitter<undefined>();

  @HostListener('keydown.enter', ['$event.target']) onenter(el: Element): void {
    if (el.tagName.toLowerCase() !== 'input') {
      return;
    }
    this.afterSearch();
  }

  @HostListener('click', ['$event.target']) onclick(el: Element): void {
    if (el.tagName.toLowerCase() === 'input') {
      return;
    }
    this.afterSearch();
  }

  private afterSearch(): void {
    this.bitSearchStart.afterSearch().subscribe(() => {
      this.bitAfter.emit(undefined);
    });
  }
}
