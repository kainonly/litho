import {NgModule} from '@angular/core';
import {BaseBitComponent} from './base-bit.component';
import {RouterModule, Routes} from '@angular/router';
import {AppExtModule} from '../../app.ext.module';

const routes: Routes = [
  {
    path: '',
    component: BaseBitComponent
  }
];

@NgModule({
  imports: [
    AppExtModule,
    RouterModule.forChild(routes)
  ],
  declarations: [BaseBitComponent]
})
export class BaseBitModule {
}
