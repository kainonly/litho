import {NgModule} from '@angular/core';
import {OperateObjecttomapComponent} from './operate-objecttomap.component';
import {RouterModule, Routes} from '@angular/router';
import {AppExtModule} from '../../app.ext.module';

const routes: Routes = [
  {
    path: '',
    component: OperateObjecttomapComponent
  }
];

@NgModule({
  imports: [
    AppExtModule,
    RouterModule.forChild(routes)
  ],
  declarations: [OperateObjecttomapComponent]
})
export class OperateObjecttomapModule {
}
