import {Directive, EventEmitter, HostListener, Input, Output} from '@angular/core';
import {LocalStorage} from '@ngx-pwa/local-storage';
import {BitService} from '../base/bit.service';

@Directive({
  selector: '[bit-search-start]'
})
export class BitSearchStartDirective {
  @Input() searchSelector: string;
  @Output() searchover: EventEmitter<any> = new EventEmitter<any>();

  constructor(private bit: BitService,
              private storage: LocalStorage) {
  }

  @HostListener('keydown.enter') onenter() {
    this.searchStart();
  }

  @HostListener('click') onclick() {
    this.searchStart();
  }

  private searchStart() {
    this.storage.setItem('search:' + this.searchSelector, this.bit.search).subscribe(() => {
      this.searchover.emit(true);
    });
  }
}
