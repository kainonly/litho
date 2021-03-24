import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShopIndexComponent } from './shop-index.component';
import { AppExtModule } from '@ext';

const routes: Routes = [
  {
    path: '',
    component: ShopIndexComponent
  }
];

@NgModule({
  imports: [AppExtModule, RouterModule.forChild(routes)],
  declarations: [ShopIndexComponent]
})
export class ShopIndexModule {
}
