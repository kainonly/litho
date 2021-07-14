import { Component } from '@angular/core';
import { Bit } from 'ngx-bit';
import { BitRouterService } from '../bit-router.service';

@Component({
  selector: 'bit-page-header',
  templateUrl: './bit-page-header.component.html',
  styleUrls: ['./bit-page-header.component.scss']
})
export class BitPageHeaderComponent {
  constructor(public bit: Bit, public router: BitRouterService) {}
}
