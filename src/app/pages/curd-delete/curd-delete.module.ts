import {NgModule} from '@angular/core';
import {CurdDeleteComponent} from './curd-delete.component';
import {RouterModule, Routes} from '@angular/router';
import {AppExtModule} from '../../app.ext.module';

const routes: Routes = [
  {
    path: '',
    component: CurdDeleteComponent
  }
];

@NgModule({
  imports: [
    AppExtModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CurdDeleteComponent]
})
export class CurdDeleteModule {
}
