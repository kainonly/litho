import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { ListByPage } from 'ngx-bit/factory';

@Directive({
  selector: '[bitSearchStart]'
})
export class BitSearchStartDirective {
  @Input() bitSearchStart: ListByPage;
  @Output() after: EventEmitter<any> = new EventEmitter<any>();

  @HostListener('keydown.enter') onenter(): void {
    this.afterSearch();
  }

  @HostListener('click') onclick(): void {
    this.afterSearch();
  }

  private afterSearch(): void {
    this.bitSearchStart.afterSearch().subscribe(() => {
      this.after.emit(true);
    });
  }
}
