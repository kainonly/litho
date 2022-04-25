import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WpxModule, WpxShareModule } from '@weplanx/ng';

import { WpxHeaderModule } from '../header/header.module';
import { WpxNavModule } from '../nav/nav.module';
import { CenterComponent } from './center.component';
import { WorkComponent } from './work/work.component';

const routes: Routes = [
  {
    path: '',
    component: CenterComponent,
    children: [
      {
        path: 'work',
        component: WorkComponent
      },
      { path: '', redirectTo: '/center/work', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [WpxModule, WpxShareModule, WpxHeaderModule, WpxNavModule, RouterModule.forChild(routes)],
  declarations: [CenterComponent, WorkComponent]
})
export class CenterModule {}
