import {NgModule} from '@angular/core';
import {CurdEditComponent} from './curd-edit.component';
import {RouterModule, Routes} from '@angular/router';
import {AppExtModule} from '../../app.ext.module';

const routes: Routes = [
  {
    path: '',
    component: CurdEditComponent
  }
];

@NgModule({
  imports: [
    AppExtModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CurdEditComponent]
})
export class CurdEditModule {
}
