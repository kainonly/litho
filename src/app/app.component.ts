import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  s = {
    car1: 'blue',
    car2: 'red'
  };

  constructor() {
  }
}
