import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';

import { FormComponent } from './form/form.component';
import { IndexTypePipe } from './index-type.pipe';
import { IndexesComponent } from './indexes.component';

const routes: Routes = [
  {
    path: '',
    component: IndexesComponent
  }
];

@NgModule({
  imports: [ShareModule, RouterModule.forChild(routes)],
  declarations: [IndexesComponent, IndexTypePipe, FormComponent]
})
export class IndexesModule {}
