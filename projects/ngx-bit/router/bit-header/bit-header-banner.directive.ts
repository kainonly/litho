import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[bitHeaderBanner]'
})
export class BitHeaderBannerDirective {
  constructor(public ref: TemplateRef<unknown>) {}
}
