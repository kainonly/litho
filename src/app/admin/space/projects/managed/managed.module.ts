import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';

import { FormComponent } from './form/form.component';
import { ManagedComponent } from './managed.component';

const routes: Routes = [
  {
    path: '',
    component: ManagedComponent
  }
];

@NgModule({
  imports: [ShareModule, RouterModule.forChild(routes)],
  declarations: [ManagedComponent, FormComponent]
})
export class ManagedModule {}
