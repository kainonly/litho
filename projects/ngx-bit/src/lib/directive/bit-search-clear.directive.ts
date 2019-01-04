import {Directive, EventEmitter, HostListener, Input, Output} from '@angular/core';
import {LocalStorage} from '@ngx-pwa/local-storage';
import {BitService} from '../bit.service';

@Directive({
  selector: '[bit-search-clear]'
})
export class BitSearchClearDirective {
  @Input() searchSelector: string;
  @Output() searchclear: EventEmitter<any> = new EventEmitter<any>();

  constructor(private bit: BitService,
              private storage: LocalStorage) {
  }

  @HostListener('click')
  onclick() {
    for (const x of this.bit.search) {
      x.value = '';
    }
    this.storage.removeItem('search:' + this.searchSelector).subscribe(() => {
      this.searchclear.emit(true);
    });
  }
}
