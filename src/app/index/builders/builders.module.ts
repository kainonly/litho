import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';

import { BuildersComponent } from './builders.component';
import { FormComponent } from './form/form.component';
import { OutlineComponent } from './outline/outline.component';

const routes: Routes = [
  {
    path: '',
    component: BuildersComponent
  }
];

@NgModule({
  imports: [ShareModule, RouterModule.forChild(routes)],
  declarations: [BuildersComponent, OutlineComponent, FormComponent]
})
export class BuildersModule {}
