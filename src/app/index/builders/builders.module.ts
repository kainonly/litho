import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';

import { BuildersComponent } from './builders.component';
import { FormComponent } from './form/form.component';
import { IndexComponent } from './index.component';
import { PageComponent } from './page/page.component';

const routes: Routes = [
  {
    path: '',
    component: BuildersComponent,
    children: [
      {
        path: 'index',
        component: IndexComponent
      },
      {
        path: ':id',
        component: PageComponent
      },
      { path: '', redirectTo: 'index', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [ShareModule, RouterModule.forChild(routes)],
  declarations: [BuildersComponent, FormComponent, IndexComponent, PageComponent]
})
export class BuildersModule {}
