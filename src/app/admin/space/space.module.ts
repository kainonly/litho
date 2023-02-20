import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';

import { SpaceComponent } from './space.component';

const routes: Routes = [
  {
    path: '',
    component: SpaceComponent,
    children: [
      {
        path: 'projects',
        loadChildren: () => import('./projects/projects.module').then(m => m.ProjectsModule),
        data: {
          breadcrumb: $localize`项目`
        }
      },
      { path: '', redirectTo: 'projects', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [ShareModule, RouterModule.forChild(routes)],
  declarations: [SpaceComponent]
})
export class SpaceModule {}
