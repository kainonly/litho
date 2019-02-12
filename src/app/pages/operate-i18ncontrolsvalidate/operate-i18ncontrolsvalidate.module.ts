import {NgModule} from '@angular/core';
import {OperateI18ncontrolsvalidateComponent} from './operate-i18ncontrolsvalidate.component';
import {RouterModule, Routes} from '@angular/router';
import {AppExtModule} from '../../app.ext.module';

const routes: Routes = [
  {
    path: '',
    component: OperateI18ncontrolsvalidateComponent
  }
];

@NgModule({
  imports: [
    AppExtModule,
    RouterModule.forChild(routes)
  ],
  declarations: [OperateI18ncontrolsvalidateComponent]
})
export class OperateI18ncontrolsvalidateModule {
}
