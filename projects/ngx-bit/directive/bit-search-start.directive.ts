import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { ListByPage } from 'ngx-bit';

@Directive({
  selector: '[bitSearchStart]'
})
export class BitSearchStartDirective {
  @Input() bitSearchStart!: ListByPage;
  @Output() after: EventEmitter<any> = new EventEmitter<any>();

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
      this.after.emit(true);
    });
  }
}
