import { Component } from '@angular/core';
import { BitService } from 'ngx-bit';

@Component({
  selector: 'app-welcome',
  template: ``
})
export class WelcomeComponent {
  constructor(public bit: BitService) {}
}
