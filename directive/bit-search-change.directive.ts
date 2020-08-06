import { Directive, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgModel } from '@angular/forms';
import { switchMap } from 'rxjs/operators';
import { ListByPage } from 'ngx-bit';

@Directive({
  selector: '[bitSearchChange]'
})
export class BitSearchChangeDirective implements OnInit {
  @Input() bitSearchChange: ListByPage;
  @Output() after: EventEmitter<any> = new EventEmitter<any>();

  constructor(private model: NgModel) {
  }

  ngOnInit() {
    this.model.update.pipe(
      switchMap(_ => this.bitSearchChange.afterSearch()
      )
    ).subscribe(_ => {
      this.after.emit(true);
    });
  }
}
