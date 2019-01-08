import {Directive, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {LocalStorage} from '@ngx-pwa/local-storage';
import {NgModel} from '@angular/forms';
import {BitService} from 'ngx-bit';


@Directive({
  selector: '[bit-search-change]'
})
export class BitSearchChangeDirective implements OnInit {
  @Input() searchSelector: string;
  @Output() searchover: EventEmitter<any> = new EventEmitter<any>();

  constructor(private bit: BitService,
              private model: NgModel,
              private storage: LocalStorage) {
  }

  ngOnInit() {
    this.model.update.subscribe(() => {
      this.searchStart();
    });
  }

  private searchStart() {
    this.storage.setItem('search:' + this.searchSelector, this.bit.search).subscribe(() => {
      this.searchover.emit(true);
    });
  }
}
