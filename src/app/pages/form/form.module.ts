import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppShareModule } from '@share';

import { AdvancedComponent } from './advanced/advanced.component';
import { BasicComponent } from './basic/basic.component';
import { ConfirmComponent } from './step/confirm/confirm.component';
import { FinishComponent } from './step/finish/finish.component';
import { FormComponent } from './step/form/form.component';
import { StepComponent } from './step/step.component';

const routes: Routes = [
  {
    path: 'basic',
    component: BasicComponent
  },
  {
    path: 'step',
    component: StepComponent
  },
  {
    path: 'advanced',
    component: AdvancedComponent
  },
  { path: '', redirectTo: '/form/basic', pathMatch: 'full' }
];

@NgModule({
  imports: [AppShareModule, RouterModule.forChild(routes)],
  declarations: [BasicComponent, StepComponent, AdvancedComponent, FormComponent, ConfirmComponent, FinishComponent]
})
export class FormModule {}
