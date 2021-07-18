import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroupDirective } from '@angular/forms';

import { BitService } from 'ngx-bit';

@Component({
  selector: 'bit-i18n',
  templateUrl: './bit-i18n.component.html'
})
export class BitI18nComponent implements OnInit {
  @Input() bitTitle!: string;
  @Input() formGroup!: AbstractControl;
  i18nVisable = false;
  test: any[] = [
    { id: '中文', content: '资源控制模块' },
    { id: '英文', content: 'Resource Module' }
  ];

  constructor(private bit: BitService, private group: FormGroupDirective) {}

  ngOnInit(): void {
    console.log(this.group);
  }

  open(): void {
    this.i18nVisable = true;
  }

  close(): void {
    this.i18nVisable = false;
  }
}
