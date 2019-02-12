import {NgModule} from '@angular/core';
import {PipeObjecttoarrayComponent} from './pipe-objecttoarray.component';
import {RouterModule, Routes} from '@angular/router';
import {AppExtModule} from '../../app.ext.module';

const routes: Routes = [
  {
    path: '',
    component: PipeObjecttoarrayComponent
  }
];

@NgModule({
  imports: [
    AppExtModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PipeObjecttoarrayComponent]
})
export class PipeObjecttoarrayModule {
}
