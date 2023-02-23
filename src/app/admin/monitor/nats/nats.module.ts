import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';

import { NatsComponent } from './nats.component';

const routes: Routes = [
  {
    path: '',
    component: NatsComponent
  }
];

@NgModule({
  imports: [ShareModule, RouterModule.forChild(routes)],
  declarations: [NatsComponent]
})
export class NatsModule {}
