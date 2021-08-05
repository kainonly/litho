import { Directive, Input, TemplateRef } from '@angular/core';

import { Locale } from './types';

@Directive({
  selector: '[bitI18nItem]'
})
export class BitI18nItemDirective {
  @Input() bitI18nItem!: Locale;

  constructor(public ref: TemplateRef<any>) {}
}
