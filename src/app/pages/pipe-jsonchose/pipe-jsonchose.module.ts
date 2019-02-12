import {NgModule} from '@angular/core';
import {PipeJsonchoseComponent} from './pipe-jsonchose.component';
import {RouterModule, Routes} from '@angular/router';
import {AppExtModule} from '../../app.ext.module';

const routes: Routes = [
  {
    path: '',
    component: PipeJsonchoseComponent
  }
];

@NgModule({
  imports: [
    AppExtModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PipeJsonchoseComponent]
})
export class PipeJsonchoseModule {
}
