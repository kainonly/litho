import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';

import { FunctionsComponent } from './functions.component';

const routes: Routes = [
  {
    path: '',
    component: FunctionsComponent
  }
];

@NgModule({
  imports: [ShareModule, RouterModule.forChild(routes)],
  declarations: [FunctionsComponent]
})
export class FunctionsModule {}
