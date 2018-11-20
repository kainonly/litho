import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  constructor() {
    const s = {
      0: 'asd',
      1: 'dasd',
      4: 'asd'
    };
    const array = [];
    for (const i in s) {
      if (s.hasOwnProperty(i)) {
        array.push({
          key: i,
          rows: s[i]
        });
      }
    }
    console.log(array);
  }
}
