import {Component} from '@angular/core';
import {isArray, isObject} from 'util';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  constructor() {
    console.log(isObject([]) && !isArray([]));
  }
}
