import {NgModule} from '@angular/core';
import {CurdStatusComponent} from './curd-status.component';
import {RouterModule, Routes} from '@angular/router';
import {AppExtModule} from '../../app.ext.module';

const routes: Routes = [
  {
    path: '',
    component: CurdStatusComponent
  }
];

@NgModule({
  imports: [
    AppExtModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CurdStatusComponent]
})
export class CurdStatusModule {
}
