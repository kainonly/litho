import { NgModule } from '@angular/core';

import { HeaderComponent } from '@common/header/header.component';
import { ProjectsModule } from '@common/projects/projects.module';
import { ShareModule } from '@common/share.module';

@NgModule({
  imports: [ShareModule, ProjectsModule],
  exports: [HeaderComponent],
  declarations: [HeaderComponent]
})
export class HeaderModule {}
