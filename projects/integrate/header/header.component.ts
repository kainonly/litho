import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

import { WpxService } from '@weplanx/ng';

@Component({
  selector: 'wpx-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class WpxHeaderComponent {
  @Output() readonly wpxOnLogout: EventEmitter<any> = new EventEmitter<any>();

  constructor(public wpx: WpxService, private router: Router) {}

  logout(): void {
    this.wpx.logout().subscribe(() => {
      this.router.navigateByUrl('/login');
      this.wpxOnLogout.emit(undefined);
    });
  }
}
