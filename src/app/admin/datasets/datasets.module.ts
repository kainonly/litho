import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';

import { ControlsComponent } from './controls/controls.component';
import { DatasetsComponent } from './datasets.component';
import { FormComponent } from './form/form.component';

const routes: Routes = [
  {
    path: '',
    component: DatasetsComponent
  }
];

@NgModule({
  imports: [ShareModule, RouterModule.forChild(routes)],
  declarations: [DatasetsComponent, FormComponent, ControlsComponent]
})
export class DatasetsModule {}
