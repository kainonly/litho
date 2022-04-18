import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';
import { WpxCheckboxModule } from '@weplanx/ng/checkbox';
import { WpxMediaModule } from '@weplanx/ng/media';
import { WpxRichtextModule } from '@weplanx/ng/richtext';
import { WpxUploadModule } from '@weplanx/ng/upload';

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
