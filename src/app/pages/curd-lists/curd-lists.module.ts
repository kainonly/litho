import {NgModule} from '@angular/core';
import {CurdListsComponent} from './curd-lists.component';
import {RouterModule, Routes} from '@angular/router';
import {AppExtModule} from '../../app.ext.module';

const routes: Routes = [
  {
    path: '',
    component: CurdListsComponent
  }
];

@NgModule({
  imports: [
    AppExtModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CurdListsComponent]
})
export class CurdListsModule {
}
