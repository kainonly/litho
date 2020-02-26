import {Directive, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {StorageMap} from '@ngx-pwa/local-storage';
import {NgModel} from '@angular/forms';
import {switchMap} from 'rxjs/operators';
import {BitService} from '../common/bit.service';

@Directive({
  selector: '[bitSearchChange]'
})
export class BitSearchChangeDirective implements OnInit {
  @Input() bitSearchChange: string;
  @Input() variable: object;
  @Output() after: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private bit: BitService,
    private model: NgModel,
    private storageMap: StorageMap
  ) {
  }

  ngOnInit() {
    this.model.update.pipe(
      switchMap(_ =>
        this.storageMap.set('search:' + this.bitSearchChange, !this.variable ? this.bit.search : this.variable
        )
      )
    ).subscribe(_ => {
      this.after.emit(true);
    });
  }
}
