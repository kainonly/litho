import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShopEditComponent } from './shop-edit.component';
import { AppExtModule } from '@ext';

const routes: Routes = [
  {
    path: '',
    component: ShopEditComponent
  }
];

@NgModule({
  imports: [AppExtModule, RouterModule.forChild(routes)],
  declarations: [ShopEditComponent]
})
export class ShopEditModule {
}
