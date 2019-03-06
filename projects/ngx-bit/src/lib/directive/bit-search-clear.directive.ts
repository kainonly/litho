import {Directive, EventEmitter, HostListener, Input, Output} from '@angular/core';
import {LocalStorage} from '@ngx-pwa/local-storage';
import {BitService} from '../base/bit.service';

@Directive({
  selector: '[bitSearchClear]'
})
export class BitSearchClearDirective {
  @Input() bitSearchClear: string;
  @Output() after: EventEmitter<any> = new EventEmitter<any>();

  constructor(private bit: BitService,
              private storage: LocalStorage) {
  }

  @HostListener('click')
  onclick() {
    for (const x of this.bit.search) {
      x.value = '';
    }
    this.storage.removeItem('search:' + this.bitSearchClear).subscribe(() => {
      this.after.emit(true);
    });
  }
}
