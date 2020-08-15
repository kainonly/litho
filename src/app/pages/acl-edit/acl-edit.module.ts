import {NgModule} from '@angular/core';
import {AclEditComponent} from './acl-edit.component';
import {RouterModule, Routes} from '@angular/router';
import {AppExtModule} from '@ext';

const routes: Routes = [
  {
    path: '',
    component: AclEditComponent,
  }
];

@NgModule({
  imports: [
    AppExtModule,
    RouterModule.forChild(routes),
  ],
  declarations: [AclEditComponent]
})
export class AclEditModule {
}
