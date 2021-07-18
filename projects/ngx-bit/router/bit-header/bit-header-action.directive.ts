import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[bitHeaderAction]'
})
export class BitHeaderActionDirective {
  constructor(public ref: TemplateRef<any>) {}
}
