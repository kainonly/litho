import {NgModule} from '@angular/core';
import {CommonSwalComponent} from './common-swal.component';
import {RouterModule, Routes} from '@angular/router';
import {AppExtModule} from '../../app.ext.module';

const routes: Routes = [
  {
    path: '',
    component: CommonSwalComponent
  }
];

@NgModule({
  imports: [
    AppExtModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CommonSwalComponent]
})
export class CommonSwalModule {
}
