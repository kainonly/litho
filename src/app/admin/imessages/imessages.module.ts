import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';

import { ControlsComponent } from './controls/controls.component';
import { FormComponent } from './form/form.component';
import { ImessagesComponent } from './imessages.component';

const routes: Routes = [
  {
    path: '',
    component: ImessagesComponent
  }
];

@NgModule({
  imports: [ShareModule, RouterModule.forChild(routes)],
  declarations: [ImessagesComponent, FormComponent, ControlsComponent]
})
export class ImessagesModule {}
