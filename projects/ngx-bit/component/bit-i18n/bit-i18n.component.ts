import { Component } from '@angular/core';

import { BitConfig, BitService, Language } from 'ngx-bit';

@Component({
  selector: 'bit-i18n',
  templateUrl: './bit-i18n.component.html',
  exportAs: 'bitI18n'
})
export class BitI18nComponent {
  visable = false;
  id!: string;

  test: any[] = [
    { id: 'zh_cn', name: '中文', content: '资源控制模块' },
    { id: 'en_us', name: '英文', content: 'Resource Module' }
  ];

  constructor(private config: BitConfig, private bit: BitService) {}

  get languages(): Language[] {
    return this.config.i18n!.languages;
  }

  eq(language: Language): boolean {
    return this.id === language.id;
  }

  open(id: string): void {
    this.visable = true;
    this.id = id;
  }

  close(): void {
    this.visable = false;
  }
}
