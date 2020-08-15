import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmptyComponent } from './empty.component';
import { AppExtModule } from '@ext';

const routes: Routes = [
  {
    path: '',
    component: EmptyComponent
  }
];

@NgModule({
  imports: [
    AppExtModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EmptyComponent]
})
export class EmptyModule {
}
