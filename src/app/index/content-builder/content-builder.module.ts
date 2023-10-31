import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';

import { ContentBuilderComponent } from './content-builder.component';

const routes: Routes = [
  {
    path: '',
    component: ContentBuilderComponent
  }
];

@NgModule({
  imports: [ShareModule, RouterModule.forChild(routes)],
  declarations: [ContentBuilderComponent]
})
export class ContentBuilderModule {}
