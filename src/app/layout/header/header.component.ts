import { Component } from '@angular/core';

import { BitService } from 'ngx-bit';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(public bit: BitService) {}
}
