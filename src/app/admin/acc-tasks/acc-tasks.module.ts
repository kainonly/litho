import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';

import { AccTasksComponent } from './acc-tasks.component';
import { FormComponent } from './form/form.component';
import { SettingComponent } from './setting/setting.component';

const routes: Routes = [
  {
    path: '',
    component: AccTasksComponent
  }
];

@NgModule({
  imports: [ShareModule, RouterModule.forChild(routes)],
  declarations: [AccTasksComponent, FormComponent, SettingComponent]
})
export class AccTasksModule {}
