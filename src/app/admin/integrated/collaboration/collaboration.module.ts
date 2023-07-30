import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';

import { CollaborationComponent } from './collaboration.component';
import { LarkComponent } from './lark/lark.component';
import { RedirectComponent } from './redirect/redirect.component';

const routes: Routes = [
  {
    path: '',
    component: CollaborationComponent
  }
];

@NgModule({
  imports: [ShareModule, RouterModule.forChild(routes)],
  declarations: [CollaborationComponent, LarkComponent, RedirectComponent]
})
export class CollaborationModule {}
