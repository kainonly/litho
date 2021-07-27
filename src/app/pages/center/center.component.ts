import { Component, OnInit } from '@angular/core';

import { BitService } from 'ngx-bit';

import packer from './language';

@Component({
  selector: 'app-center',
  templateUrl: './center.component.html',
  styleUrls: ['./center.component.scss']
})
export class CenterComponent implements OnInit {
  constructor(public bit: BitService) {}

  ngOnInit(): void {
    this.bit.registerLocales(packer);
  }
}
