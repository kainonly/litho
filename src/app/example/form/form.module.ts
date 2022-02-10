import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';
import { WpxCheckboxModule } from '@weplanx/components/checkbox';
import { WpxMediaModule } from '@weplanx/components/media';
import { WpxRichtextModule } from '@weplanx/components/richtext';
import { WpxUploadModule } from '@weplanx/components/upload';

import { FormComponent } from './form.component';

const routes: Routes = [
  {
    path: '',
    component: FormComponent
  }
];

@NgModule({
  imports: [
    ShareModule,
    WpxCheckboxModule,
    WpxUploadModule,
    WpxRichtextModule,
    WpxMediaModule,
    RouterModule.forChild(routes)
  ],
  declarations: [FormComponent]
})
export class FormModule {}
