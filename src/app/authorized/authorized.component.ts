import { Component } from '@angular/core';

import { AppService } from '@app';

@Component({
  selector: 'app-authorized',
  templateUrl: './authorized.component.html'
})
export class AuthorizedComponent {
  constructor(private app: AppService) {}

  close(): void {
    this.app.getUser().subscribe(() => {
      window.close();
    });
  }
}
