import {NgModule} from '@angular/core';
import {PipeJsonparseComponent} from './pipe-jsonparse.component';
import {RouterModule, Routes} from '@angular/router';
import {AppExtModule} from '../../app.ext.module';

const routes: Routes = [
  {
    path: '',
    component: PipeJsonparseComponent
  }
];

@NgModule({
  imports: [
    AppExtModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PipeJsonparseComponent]
})
export class PipeJsonparseModule {
}
