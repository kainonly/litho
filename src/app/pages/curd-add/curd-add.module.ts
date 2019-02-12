import {NgModule} from '@angular/core';
import {CurdAddComponent} from './curd-add.component';
import {RouterModule, Routes} from '@angular/router';
import {AppExtModule} from '../../app.ext.module';

const routes: Routes = [
  {
    path: '',
    component: CurdAddComponent
  }
];

@NgModule({
  imports: [
    AppExtModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CurdAddComponent]
})
export class CurdAddModule {
}
