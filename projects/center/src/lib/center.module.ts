import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WpxModule, WpxShareModule } from '@weplanx/common';

import { CenterComponent } from './center.component';
import { profile, ProfileModule } from './profile/profile.module';

const routes: Routes = [
  {
    path: '',
    component: CenterComponent,
    children: [
      {
        path: 'profile',
        children: profile,
        data: {
          breadcrumb: '个人设置'
        }
      },
      { path: '', redirectTo: '/center/profile/info', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [WpxModule, WpxShareModule, ProfileModule, RouterModule.forChild(routes)],
  declarations: [CenterComponent]
})
export class CenterModule {}
