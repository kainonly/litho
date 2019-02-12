import {NgModule} from '@angular/core';
import {OperateAsyncvalidatorComponent} from './operate-asyncvalidator.component';
import {RouterModule, Routes} from '@angular/router';
import {AppExtModule} from '../../app.ext.module';

const routes: Routes = [
  {
    path: '',
    component: OperateAsyncvalidatorComponent
  }
];

@NgModule({
  imports: [
    AppExtModule,
    RouterModule.forChild(routes)
  ],
  declarations: [OperateAsyncvalidatorComponent]
})
export class OperateAsyncvalidatorModule {
}
