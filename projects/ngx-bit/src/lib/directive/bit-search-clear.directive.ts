import {Directive, EventEmitter, HostListener, Input, Output} from '@angular/core';
import {LocalStorage} from '@ngx-pwa/local-storage';
import {BitService} from '../bit.service';

@Directive({
  selector: '[bit-search-clear]'
})
export class BitSearchClearDirective {
  @Input() 'bit-search-clear': string;
  @Output() searchclear: EventEmitter<any> = new EventEmitter<any>();

  constructor(private bit: BitService,
              private storage: LocalStorage) {
  }

  @HostListener('click')
  onclick() {
    for (const x of this.bit.search) {
      x.value = '';
    }
    this.storage.removeItem('search:' + this['bit-search-clear']).subscribe(() => {
      this.searchclear.emit(true);
    });
  }
}
