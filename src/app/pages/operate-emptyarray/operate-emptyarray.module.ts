import {NgModule} from '@angular/core';
import {OperateEmptyarrayComponent} from './operate-emptyarray.component';
import {RouterModule, Routes} from '@angular/router';
import {AppExtModule} from '../../app.ext.module';

const routes: Routes = [
  {
    path: '',
    component: OperateEmptyarrayComponent
  }
];

@NgModule({
  imports: [
    AppExtModule,
    RouterModule.forChild(routes)
  ],
  declarations: [OperateEmptyarrayComponent]
})
export class OperateEmptyarrayModule {
}
