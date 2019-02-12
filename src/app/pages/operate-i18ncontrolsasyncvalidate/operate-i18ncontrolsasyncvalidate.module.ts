import {NgModule} from '@angular/core';
import {OperateI18ncontrolsasyncvalidateComponent} from './operate-i18ncontrolsasyncvalidate.component';
import {RouterModule, Routes} from '@angular/router';
import {AppExtModule} from '../../app.ext.module';

const routes: Routes = [
  {
    path: '',
    component: OperateI18ncontrolsasyncvalidateComponent
  }
];

@NgModule({
  imports: [
    AppExtModule,
    RouterModule.forChild(routes)
  ],
  declarations: [OperateI18ncontrolsasyncvalidateComponent]
})
export class OperateI18ncontrolsasyncvalidateModule {
}
