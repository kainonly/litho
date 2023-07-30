import { Component } from '@angular/core';

import { AppService } from '@app';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent {
  constructor(private app: AppService) {}

  lark(): void {
    this.app.oauth().subscribe(v => {
      window.location.href = v;
    });
  }
}
