import { Directive, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgModel } from '@angular/forms';
import { switchMap } from 'rxjs/operators';

import { WpxListByPage } from '@weplanx/ngx';

@Directive({
  selector: '[wpxSearchChange]'
})
export class WpxSearchChangeDirective implements OnInit {
  @Input() bitSearchChange!: WpxListByPage;
  @Output() readonly bitAfter: EventEmitter<undefined> = new EventEmitter<undefined>();

  constructor(private model: NgModel) {}

  ngOnInit(): void {
    this.model.update.pipe(switchMap(() => this.bitSearchChange.afterSearch())).subscribe(() => {
      this.bitAfter.emit(undefined);
    });
  }
}
