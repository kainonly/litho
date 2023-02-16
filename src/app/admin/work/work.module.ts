import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';

import { WorkComponent } from './work.component';

const routes: Routes = [
  {
    path: '',
    component: WorkComponent,
    children: [
      {
        path: 'projects',
        loadChildren: () => import('./projects/projects.module').then(m => m.ProjectsModule),
        data: {
          breadcrumb: $localize`Project`
        }
      },
      // {
      //   path: 'group',
      //   data: {
      //     breadcrumb: $localize`Group`
      //   }
      // },
      { path: '', redirectTo: 'projects', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [ShareModule, RouterModule.forChild(routes)],
  declarations: [WorkComponent]
})
export class WorkModule {}
