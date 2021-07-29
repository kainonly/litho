import { NgModule } from '@angular/core';

import { ExtraDirective } from './extra/extra.directive';
import { FooterDirective } from './footer/footer.directive';

@NgModule({
  declarations: [ExtraDirective, FooterDirective],
  exports: [ExtraDirective, FooterDirective]
})
export class DirectiveModule {}
