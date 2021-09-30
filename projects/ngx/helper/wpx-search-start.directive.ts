import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';

import { WpxListByPage } from '@weplanx/ngx';

@Directive({
  selector: '[wpxSearchStart]'
})
export class WpxSearchStartDirective {
  @Input() bitSearchStart!: WpxListByPage;
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
