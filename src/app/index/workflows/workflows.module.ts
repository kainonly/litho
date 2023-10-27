import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CodeviewModule } from '@common/components/codeview/codeview.module';
import { ShareModule } from '@common/share.module';

import { ControlModule } from './control/control.module';
import { FormComponent } from './form/form.component';
import { WorkflowsComponent } from './workflows.component';

const routes: Routes = [
  {
    path: '',
    component: WorkflowsComponent
  }
];

@NgModule({
  imports: [ShareModule, ControlModule, RouterModule.forChild(routes)],
  declarations: [WorkflowsComponent, FormComponent]
})
export class WorkflowsModule {}
