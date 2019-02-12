import {NgModule} from '@angular/core';
import {OperateObjecttoarrayComponent} from './operate-objecttoarray.component';
import {RouterModule, Routes} from '@angular/router';
import {AppExtModule} from '../../app.ext.module';

const routes: Routes = [
  {
    path: '',
    component: OperateObjecttoarrayComponent
  }
];

@NgModule({
  imports: [
    AppExtModule,
    RouterModule.forChild(routes)
  ],
  declarations: [OperateObjecttoarrayComponent]
})
export class OperateObjecttoarrayModule {
}
