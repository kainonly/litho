import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BlankModule } from '@common/blank/blank.module';
import { ShareModule } from '@common/share.module';

import { UnauthorizeComponent } from './unauthorize.component';

const routes: Routes = [
  {
    path: '',
    component: UnauthorizeComponent
  }
];

@NgModule({
  imports: [ShareModule, BlankModule, RouterModule.forChild(routes)],
  declarations: [UnauthorizeComponent]
})
export class UnauthorizeModule {}
