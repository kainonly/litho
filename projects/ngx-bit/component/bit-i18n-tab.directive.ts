import { Directive, Input, TemplateRef } from '@angular/core';

import { Language } from 'ngx-bit';

@Directive({
  selector: '[bitI18nTab]'
})
export class BitI18nTabDirective {
  @Input() bitI18nTab!: Language;

  constructor(public ref: TemplateRef<unknown>) {}
}
