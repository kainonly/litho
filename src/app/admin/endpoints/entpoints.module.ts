import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';

import { EndpointsComponent } from './endpoints.component';
import { FormComponent } from './form/form.component';

const routes: Routes = [
  {
    path: '',
    component: EndpointsComponent
  }
];

@NgModule({
  imports: [ShareModule, RouterModule.forChild(routes)],
  declarations: [EndpointsComponent, FormComponent]
})
export class EntpointsModule {}
