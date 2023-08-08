import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';

import { LogsetComponent } from './logset.component';

const routes: Routes = [
  {
    path: '',
    component: LogsetComponent
  }
];

@NgModule({
  imports: [ShareModule, RouterModule.forChild(routes)],
  declarations: [LogsetComponent]
})
export class LogsetModule {}
