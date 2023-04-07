import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';

import { FormComponent } from './form/form.component';
import { PicturesComponent } from './pictures.component';

const routes: Routes = [
  {
    path: '',
    component: PicturesComponent
  }
];

@NgModule({
  imports: [ShareModule, RouterModule.forChild(routes)],
  declarations: [PicturesComponent, FormComponent]
})
export class PicturesModule {}
