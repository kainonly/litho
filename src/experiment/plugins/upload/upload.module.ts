import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';
import { WpxRichtextModule } from '@weplanx/ng/richtext';

import { UploadComponent } from './upload.component';

const routes: Routes = [
  {
    path: '',
    component: UploadComponent
  }
];

@NgModule({
  imports: [ShareModule, WpxRichtextModule, RouterModule.forChild(routes)],
  declarations: [UploadComponent]
})
export class UploadModule {}
