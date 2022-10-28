import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';

import { BasicComponent } from './basic/basic.component';
import { EmailComponent } from './email.component';

const routes: Routes = [
  {
    path: '',
    component: EmailComponent
  }
];

@NgModule({
  imports: [ShareModule, RouterModule.forChild(routes)],
  declarations: [EmailComponent, BasicComponent]
})
export class EmailModule {}
