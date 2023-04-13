import { NgModule } from '@angular/core';

import { WpxModule, WpxShareModule } from '@weplanx/ng';

import { FormComponent } from './form/form.component';
import { WpxQuickComponent } from './quick.component';

@NgModule({
  imports: [WpxModule, WpxShareModule],
  declarations: [WpxQuickComponent, FormComponent],
  exports: [WpxQuickComponent]
})
export class WpxQuickModule {}
