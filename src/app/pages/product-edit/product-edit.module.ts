import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductEditComponent } from './product-edit.component';
import { AppExtModule } from '@ext';

const routes: Routes = [
  {
    path: '',
    component: ProductEditComponent
  }
];

@NgModule({
  imports: [AppExtModule, RouterModule.forChild(routes)],
  declarations: [ProductEditComponent]
})
export class ProductEditModule {
}
