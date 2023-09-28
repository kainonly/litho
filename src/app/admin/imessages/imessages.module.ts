import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';

import { DetailComponent } from './detail/detail.component';
import { EmqxModule } from './emqx/emqx.module';
import { FormComponent } from './form/form.component';
import { ImessagesComponent } from './imessages.component';
import { LogsComponent } from './logs/logs.component';
import { PublishComponent } from './publish/publish.component';

const routes: Routes = [
  {
    path: '',
    component: ImessagesComponent
  }
];

@NgModule({
  imports: [ShareModule, EmqxModule, RouterModule.forChild(routes)],
  declarations: [ImessagesComponent, FormComponent, DetailComponent, PublishComponent, LogsComponent]
})
export class ImessagesModule {}
