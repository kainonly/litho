import {NgModule} from '@angular/core';
import {OperateFactorylocalesComponent} from './operate-factorylocales.component';
import {RouterModule, Routes} from '@angular/router';
import {AppExtModule} from '../../app.ext.module';

const routes: Routes = [
  {
    path: '',
    component: OperateFactorylocalesComponent
  }
];

@NgModule({
  imports: [
    AppExtModule,
    RouterModule.forChild(routes)
  ],
  declarations: [OperateFactorylocalesComponent]
})
export class OperateFactorylocalesModule {
}
