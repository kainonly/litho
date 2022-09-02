import { Component } from '@angular/core';

import { WpxService } from '@weplanx/ng';

@Component({
  selector: 'app-authorized',
  templateUrl: './authorized.component.html'
})
export class AuthorizedComponent {
  constructor(private wpx: WpxService) {}

  close(): void {
    this.wpx.getUser().subscribe(() => {
      window.close();
    });
  }
}
