import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import { HeaderModule } from '@common/header/header.module';
import { ShareModule } from '@common/share.module';
import { ToolbarModule } from '@common/toolbar/toolbar.module';

import { StateComponent } from './chart/state.component';
import { WorkComponent } from './work.component';

const routes: Route[] = [
  {
    path: '',
    component: WorkComponent
  }
];

@NgModule({
  imports: [ShareModule, ToolbarModule, HeaderModule, RouterModule.forChild(routes)],
  declarations: [WorkComponent, StateComponent]
})
export class WorkModule {}
