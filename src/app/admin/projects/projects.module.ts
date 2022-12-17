import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HeaderModule } from '@common/header/header.module';
import { ShareModule } from '@common/share.module';

import { FormComponent } from './form/form.component';
import { ProjectsComponent } from './projects.component';
import { ProjectsService } from './projects.service';

const routes: Routes = [
  {
    path: '',
    component: ProjectsComponent
  }
];

@NgModule({
  imports: [ShareModule, HeaderModule, RouterModule.forChild(routes)],
  declarations: [ProjectsComponent, FormComponent],
  providers: [ProjectsService]
})
export class ProjectsModule {}
