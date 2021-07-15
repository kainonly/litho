import { Directive, Input, OnInit } from '@angular/core';

import { NzColDirective } from 'ng-zorro-antd/grid';
import { BITCONFIG } from 'ngx-bit';

@Directive({
  selector: '[bitGrid]'
})
export class BitGridDirective implements OnInit {
  @Input() bitGrid!: string;

  constructor(private nzColDirective: NzColDirective, private config: BITCONFIG) {}

  ngOnInit(): void {
    const grid = this.config.grid[this.bitGrid]!;
    this.nzColDirective.nzFlex = grid.nzFlex ?? null;
    this.nzColDirective.nzSpan = grid.nzSpan ?? null;
    this.nzColDirective.nzOrder = grid.nzOrder ?? null;
    this.nzColDirective.nzOffset = grid.nzOffset ?? null;
    this.nzColDirective.nzPush = grid.nzPush ?? null;
    this.nzColDirective.nzPull = grid.nzPull ?? null;
    this.nzColDirective.nzXs = grid.nzXs ?? null;
    this.nzColDirective.nzSm = grid.nzSm ?? null;
    this.nzColDirective.nzMd = grid.nzMd ?? null;
    this.nzColDirective.nzLg = grid.nzLg ?? null;
    this.nzColDirective.nzXl = grid.nzXl ?? null;
    this.nzColDirective.nzXXl = grid.nzXXl ?? null;
    this.nzColDirective.setHostClassMap();
  }
}
