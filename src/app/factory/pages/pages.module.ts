import { NgModule } from '@angular/core';

import { ShareModule } from '@common/share.module';

import { FormComponent } from './form/form.component';
import { PagesComponent } from './pages.component';

@NgModule({
  imports: [ShareModule],
  declarations: [PagesComponent, FormComponent],
  exports: [PagesComponent]
})
export class PagesModule {}
