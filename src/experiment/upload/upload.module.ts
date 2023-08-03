import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FilebrowserInputModule } from '@common/components/filebrowser-input/filebrowser-input.module';
import { ShareModule } from '@common/share.module';

import { UploadComponent } from './upload.component';

const routes: Routes = [
  {
    path: '',
    component: UploadComponent
  }
];

@NgModule({
  imports: [ShareModule, FilebrowserInputModule, RouterModule.forChild(routes)],
  declarations: [UploadComponent]
})
export class UploadModule {}
