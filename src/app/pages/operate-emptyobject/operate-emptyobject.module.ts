import {NgModule} from '@angular/core';
import {OperateEmptyobjectComponent} from './operate-emptyobject.component';
import {RouterModule, Routes} from '@angular/router';
import {AppExtModule} from '../../app.ext.module';

const routes: Routes = [
  {
    path: '',
    component: OperateEmptyobjectComponent
  }
];

@NgModule({
  imports: [
    AppExtModule,
    RouterModule.forChild(routes)
  ],
  declarations: [OperateEmptyobjectComponent]
})
export class OperateEmptyobjectModule {
}
