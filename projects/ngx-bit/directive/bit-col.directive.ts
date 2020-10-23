import { Directive, Input, OnInit } from '@angular/core';
import { NzColDirective } from 'ng-zorro-antd/grid';
import { BitConfigService } from 'ngx-bit';

@Directive({
  selector: '[bitCol]'
})
export class BitColDirective implements OnInit {
  @Input() bitCol: string;

  constructor(
    private nzColDirective: NzColDirective,
    private config: BitConfigService
  ) {
  }

  ngOnInit(): void {
    if (!this.config.col.hasOwnProperty(this.bitCol)) {
      return;
    }
    const col = this.config.col[this.bitCol];
    this.nzColDirective.nzXs = col.hasOwnProperty('nzXs') ? col.nzXs : null;
    this.nzColDirective.nzSm = col.hasOwnProperty('nzSm') ? col.nzSm : null;
    this.nzColDirective.nzMd = col.hasOwnProperty('nzMd') ? col.nzMd : null;
    this.nzColDirective.nzLg = col.hasOwnProperty('nzLg') ? col.nzLg : null;
    this.nzColDirective.nzXl = col.hasOwnProperty('nzXl') ? col.nzXl : null;
    this.nzColDirective.nzXXl = col.hasOwnProperty('nzXXl') ? col.nzXXl : null;
    this.nzColDirective.setHostClassMap();
  }
}
