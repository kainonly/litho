import { AfterViewInit, Component, ContentChild, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroupDirective } from '@angular/forms';

import { BitConfig, BitService } from 'ngx-bit';

@Component({
  selector: 'bit-i18n',
  templateUrl: './bit-i18n.component.html',
  exportAs: 'bitI18n'
})
export class BitI18nComponent {
  @Input() bitTitle!: string;
  i18nVisable = false;
  test: any[] = [
    { id: 'zh_cn', name: '中文', content: '资源控制模块' },
    { id: 'en_us', name: '英文', content: 'Resource Module' }
  ];
  id!: string;

  constructor(private config: BitConfig, private bit: BitService) {}

  get contain(): string[] {
    return this.config.i18n!.contain;
  }

  open(id: string): void {
    this.i18nVisable = true;
    this.id = id;
  }

  close(): void {
    this.i18nVisable = false;
  }
}
