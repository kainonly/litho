import { NgModule } from '@angular/core';

import { HeaderComponent } from '@common/header/header.component';
import { PathPipe } from '@common/header/path.pipe';
import { ProjectsModule } from '@common/projects/projects.module';
import { ShareModule } from '@common/share.module';

@NgModule({
  imports: [ShareModule, ProjectsModule],
  declarations: [HeaderComponent, PathPipe],
  exports: [HeaderComponent]
})
export class HeaderModule {}
