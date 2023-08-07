import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';

import { EntryComponent } from './entry/entry.component';
import { ExpirePipe } from './expire.pipe';
import { FormComponent } from './form/form.component';
import { ProjectsComponent } from './projects.component';

const routes: Routes = [
  {
    path: '',
    component: ProjectsComponent
  }
];

@NgModule({
  imports: [ShareModule, RouterModule.forChild(routes)],
  declarations: [ProjectsComponent, FormComponent, EntryComponent, ExpirePipe]
})
export class ProjectsModule {}
