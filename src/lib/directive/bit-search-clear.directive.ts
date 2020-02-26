import {Directive, EventEmitter, HostListener, Input, Output} from '@angular/core';
import {StorageMap} from '@ngx-pwa/local-storage';
import {BitService} from '../common/bit.service';

@Directive({
  selector: '[bitSearchClear]'
})
export class BitSearchClearDirective {
  @Input() bitSearchClear: string;
  @Input() variable: object;
  @Input() reset: any;
  @Output() after: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private bit: BitService,
    private storageMap: StorageMap
  ) {
  }

  @HostListener('click')
  onclick() {
    if (!this.variable) {
      for (const i in this.bit.search) {
        if (!this.bit.search.hasOwnProperty(i)) {
          continue;
        }
        const search = this.bit.search[i];
        if (this.reset !== undefined && this.reset.hasOwnProperty(search.field)) {
          search.value = this.reset[search.field];
        } else {
          search.value = '';
        }
      }
    } else {
      for (const i in this.variable) {
        if (!this.variable.hasOwnProperty(i)) {
          continue;
        }
        const search = this.variable[i];
        if (this.reset !== undefined && this.reset.hasOwnProperty(search.field)) {
          search.value = this.reset[search.field];
        } else {
          search.value = '';
        }
      }
    }
    this.storageMap.delete('search:' + this.bitSearchClear).subscribe(() => {
      this.after.emit(true);
    });
  }
}
