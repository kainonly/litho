import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';

import { MongodbComponent } from './mongodb.component';

const routes: Routes = [
  {
    path: '',
    component: MongodbComponent
  }
];

@NgModule({
  imports: [ShareModule, RouterModule.forChild(routes)],
  declarations: [MongodbComponent]
})
export class MongodbModule {}
