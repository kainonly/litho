import { Directive, Input, OnInit } from '@angular/core';

import { NzColDirective } from 'ng-zorro-antd/grid';
import { BitConfig } from 'ngx-bit';

@Directive({
  selector: '[bitCol]'
})
export class BitColDirective implements OnInit {
  @Input() bitCol!: 'label' | 'control' | 'submit' | string;

  constructor(private nzColDirective: NzColDirective, private config: BitConfig) {}

  ngOnInit(): void {
    const grid = this.config.grid[this.bitCol]!;
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
