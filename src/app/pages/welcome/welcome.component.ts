import { Component, OnInit } from '@angular/core';
import { BitService } from 'ngx-bit';

@Component({
  selector: 'app-welcome',
  template: ``
})
export class WelcomeComponent implements OnInit {
  constructor(
    public bit: BitService
  ) {
  }

  ngOnInit() {
  }
}
