import { NgModule } from '@angular/core';
import {
  ExampleAddComponent,
  ExampleComponent,
  ExampleEditComponent,
  ExampleIndexComponent,
  ExampleOptComponent
} from './example.component';

@NgModule({
  declarations: [
    ExampleComponent,
    ExampleIndexComponent,
    ExampleAddComponent,
    ExampleEditComponent,
    ExampleOptComponent
  ],
  exports: [
    ExampleComponent,
    ExampleIndexComponent,
    ExampleAddComponent,
    ExampleEditComponent,
    ExampleOptComponent
  ]
})
export class ExampleModule {
}
