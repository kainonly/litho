import {Directive, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {LocalStorage} from '@ngx-pwa/local-storage';
import {NgModel} from '@angular/forms';
import {BitService} from '../base/bit.service';
import {switchMap} from 'rxjs/operators';

@Directive({
  selector: '[bitSearchChange]'
})
export class BitSearchChangeDirective implements OnInit {
  @Input() bitSearchChange: string;
  @Output() after: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private bit: BitService,
    private model: NgModel,
    private storage: LocalStorage
  ) {
  }

  ngOnInit() {
    this.model.update.pipe(
      switchMap(_ => this.storage.setItem('search:' + this.bitSearchChange, this.bit.search))
    ).subscribe(_ => {
      this.after.emit(true);
    });
  }
}
