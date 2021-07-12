import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[bitHeaderTags]'
})
export class BitHeaderTagsDirective {
  constructor(public ref: TemplateRef<any>) {}
}
