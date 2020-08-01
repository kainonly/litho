import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { ListByPage } from '../factory/list-by-page';

@Directive({
  selector: '[bitSearchStart]'
})
export class BitSearchStartDirective {
  @Input() bitSearchStart: ListByPage;
  @Output() after: EventEmitter<any> = new EventEmitter<any>();

  @HostListener('keydown.enter') onenter() {
    this.afterSearch();
  }

  @HostListener('click') onclick() {
    this.afterSearch();
  }

  private afterSearch() {
    this.bitSearchStart.afterSearch().subscribe(() => {
      this.after.emit(true);
    });
  }
}
