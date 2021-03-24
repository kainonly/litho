import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductIndexComponent } from './product-index.component';
import { AppExtModule } from '@ext';

const routes: Routes = [
  {
    path: '',
    component: ProductIndexComponent
  }
];

@NgModule({
  imports: [AppExtModule, RouterModule.forChild(routes)],
  declarations: [ProductIndexComponent]
})
export class ProductIndexModule {
}
