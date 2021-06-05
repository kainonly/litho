import { NgModule } from '@angular/core';
import {
  EmptyComponent,
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
    ExampleOptComponent,
    EmptyComponent
  ],
  exports: [
    ExampleComponent,
    ExampleIndexComponent,
    ExampleAddComponent,
    ExampleEditComponent,
    ExampleOptComponent,
    EmptyComponent
  ]
})
export class ExampleModule {
}
