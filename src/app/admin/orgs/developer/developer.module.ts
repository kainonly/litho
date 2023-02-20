import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';

import { DeveloperComponent } from './developer.component';
import { FormComponent } from './form/form.component';

const routes: Routes = [
  {
    path: '',
    component: DeveloperComponent
  }
];

@NgModule({
  imports: [ShareModule, RouterModule.forChild(routes)],
  declarations: [DeveloperComponent, FormComponent]
})
export class DeveloperModule {}
