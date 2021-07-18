import { Directive, Input, TemplateRef } from '@angular/core';

import { Language } from 'ngx-bit';

@Directive({
  selector: '[bitI18nItem]'
})
export class BitI18nItemDirective {
  @Input() bitI18nItem!: Language;

  constructor(public ref: TemplateRef<any>) {}
}
