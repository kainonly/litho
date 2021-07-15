import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[bitHeaderFooter]'
})
export class BitHeaderFooterDirective {
  constructor(public ref: TemplateRef<unknown>) {}
}
