import { NgModule } from '@angular/core';

import { ProjectsModule } from '../projects/projects.module';
import { ShareModule } from '../share.module';
import { HeaderComponent } from './header.component';

@NgModule({
  imports: [ShareModule, ProjectsModule],
  exports: [HeaderComponent],
  declarations: [HeaderComponent]
})
export class HeaderModule {}
