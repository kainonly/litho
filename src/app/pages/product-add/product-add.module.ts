import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductAddComponent } from './product-add.component';
import { AppExtModule } from '@ext';

const routes: Routes = [
  {
    path: '',
    component: ProductAddComponent
  }
];

@NgModule({
  imports: [AppExtModule, RouterModule.forChild(routes)],
  declarations: [ProductAddComponent]
})
export class ProductAddModule {
}
