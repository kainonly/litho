import {NgModule} from '@angular/core';
import {OperateI18ncontrolsvalueComponent} from './operate-i18ncontrolsvalue.component';
import {RouterModule, Routes} from '@angular/router';
import {AppExtModule} from '../../app.ext.module';

const routes: Routes = [
  {
    path: '',
    component: OperateI18ncontrolsvalueComponent
  }
];

@NgModule({
  imports: [
    AppExtModule,
    RouterModule.forChild(routes)
  ],
  declarations: [OperateI18ncontrolsvalueComponent]
})
export class OperateI18ncontrolsvalueModule {
}
