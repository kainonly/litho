import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProjectModule } from '@common/components/project/project.module';
import { ShareModule } from '@common/share.module';

import { AuthorizationComponent } from './authorization/authorization.component';
import { ExpirePipe } from './expire.pipe';
import { ProjectsComponent } from './projects.component';

const routes: Routes = [
  {
    path: '',
    component: ProjectsComponent
  }
];

@NgModule({
  imports: [ShareModule, ProjectModule, RouterModule.forChild(routes)],
  declarations: [ProjectsComponent, AuthorizationComponent, ExpirePipe]
})
export class ProjectsModule {}
