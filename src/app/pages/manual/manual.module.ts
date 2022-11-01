import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';

import { ManualComponent } from './manual.component';
import { ScopeComponent } from './scope/scope.component';

const routes: Routes = [
  {
    path: '',
    component: ManualComponent
  }
];

@NgModule({
  imports: [ShareModule, RouterModule.forChild(routes)],
  declarations: [ManualComponent, ScopeComponent]
})
export class ManualModule {}
