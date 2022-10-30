import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';

import { AdvancedComponent } from './advanced.component';

const routes: Routes = [
  {
    path: '',
    component: AdvancedComponent
  }
];

@NgModule({
  imports: [ShareModule, RouterModule.forChild(routes)],
  declarations: [AdvancedComponent]
})
export class AdvancedModule {}
