import {NgModule} from '@angular/core';
import {PipeEmptyarrayComponent} from './pipe-emptyarray.component';
import {RouterModule, Routes} from '@angular/router';
import {AppExtModule} from '../../app.ext.module';

const routes: Routes = [
  {
    path: '',
    component: PipeEmptyarrayComponent
  }
];

@NgModule({
  imports: [
    AppExtModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PipeEmptyarrayComponent]
})
export class PipeEmptyarrayModule {
}
