import {NgModule} from '@angular/core';
import {CurdGetComponent} from './curd-get.component';
import {RouterModule, Routes} from '@angular/router';
import {AppExtModule} from '../../app.ext.module';

const routes: Routes = [
  {
    path: '',
    component: CurdGetComponent
  }
];

@NgModule({
  imports: [
    AppExtModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CurdGetComponent]
})
export class CurdGetModule {
}
