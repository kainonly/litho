import {Directive, EventEmitter, HostListener, Input, Output} from '@angular/core';
import {StorageMap} from '@ngx-pwa/local-storage';
import {BitService} from '../common/bit.service';

@Directive({
  selector: '[bitSearchStart]'
})
export class BitSearchStartDirective {
  @Input() bitSearchStart: string;
  @Input() variable: object;
  @Output() after: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private bit: BitService,
    private storageMap: StorageMap
  ) {
  }

  @HostListener('keydown.enter') onenter() {
    this.searchStart();
  }

  @HostListener('click') onclick() {
    this.searchStart();
  }

  /**
   * search data save storage
   */
  private searchStart() {
    this.storageMap.set(
      'search:' + this.bitSearchStart, !this.variable ? this.bit.search : this.variable
    ).subscribe(() => {
      this.after.emit(true);
    });
  }
}
