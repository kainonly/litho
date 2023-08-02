import { NgModule } from '@angular/core';

import { WpxModule, WpxShareModule } from '@weplanx/ng';

import { WpxCategoriesComponent } from './categories.component';
import { FormComponent } from './form/form.component';

@NgModule({
  imports: [WpxShareModule, WpxModule],
  declarations: [WpxCategoriesComponent, FormComponent],
  exports: [WpxCategoriesComponent]
})
export class WpxCategoriesModule {}
