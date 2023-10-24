import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';

import { ExpirePipe } from './expire.pipe';
import { FormComponent } from './form/form.component';
import { OpenapiComponent } from './openapi/openapi.component';
import { ProjectsComponent } from './projects.component';

const routes: Routes = [
  {
    path: '',
    component: ProjectsComponent
  }
];

@NgModule({
  imports: [ShareModule, RouterModule.forChild(routes)],
  declarations: [ProjectsComponent, FormComponent, OpenapiComponent, ExpirePipe]
})
export class ProjectsModule {}
