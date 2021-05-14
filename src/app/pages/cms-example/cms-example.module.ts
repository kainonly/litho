import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppExtModule } from '@ext';
import { CmsExampleComponent } from './cms-example.component';

const routes: Routes = [
  {
    path: '',
    component: CmsExampleComponent
  }
];

@NgModule({
  imports: [
    AppExtModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    CmsExampleComponent
  ]
})
export class CmsExampleModule {
}
