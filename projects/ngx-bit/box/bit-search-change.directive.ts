import { Directive, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgModel } from '@angular/forms';
import { switchMap } from 'rxjs/operators';

import { Lists } from 'ngx-bit';

@Directive({
  selector: '[bitSearchChange]'
})
export class BitSearchChangeDirective implements OnInit {
  @Input() bitSearchChange!: Lists;
  @Output() readonly bitAfter: EventEmitter<undefined> = new EventEmitter<undefined>();

  constructor(private model: NgModel) {}

  ngOnInit(): void {
    this.model.update.pipe(switchMap(() => this.bitSearchChange.afterSearch())).subscribe(() => {
      this.bitAfter.emit(undefined);
    });
  }
}
