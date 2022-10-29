import { NgModule } from '@angular/core';

import { ShareModule } from '../share.module';
import { FormComponent } from './form/form.component';
import { ProjectsComponent } from './projects.component';

@NgModule({
  imports: [ShareModule],
  declarations: [ProjectsComponent, FormComponent],
  exports: [ProjectsComponent, FormComponent]
})
export class ProjectsModule {}
