import { Component, OnInit } from '@angular/core';

import { ShareModule } from '@common/share.module';

@Component({
  standalone: true,
  imports: [ShareModule],
  selector: 'app-root',
  template: ` <router-outlet></router-outlet> `
})
export class AppComponent implements OnInit {
  ngOnInit(): void {}
}
