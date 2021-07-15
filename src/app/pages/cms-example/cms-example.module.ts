import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppShareModule } from '@share';

import { CmsExampleComponent } from './cms-example.component';

const routes: Routes = [
  {
    path: '',
    component: CmsExampleComponent
  }
];

@NgModule({
  imports: [AppShareModule, RouterModule.forChild(routes)],
  declarations: [CmsExampleComponent]
})
export class CmsExampleModule {}
