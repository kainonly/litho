import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';
import { WpxFormModule } from '@weplanx/ng/form';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';

import { PagesFormComponent } from './pages-form.component';

const routes: Routes = [
  {
    path: '',
    component: PagesFormComponent
  }
];

@NgModule({
  imports: [ShareModule, NzDescriptionsModule, WpxFormModule, RouterModule.forChild(routes)],
  declarations: [PagesFormComponent]
})
export class PagesFormModule {}
