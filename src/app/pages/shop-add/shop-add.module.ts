import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShopAddComponent } from './shop-add.component';
import { AppExtModule } from '@ext';

const routes: Routes = [
  {
    path: '',
    component: ShopAddComponent
  }
];

@NgModule({
  imports: [AppExtModule, RouterModule.forChild(routes)],
  declarations: [ShopAddComponent]
})
export class ShopAddModule {
}
