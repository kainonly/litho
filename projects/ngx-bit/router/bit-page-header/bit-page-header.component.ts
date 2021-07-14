import { Component } from '@angular/core';
import { BitService } from 'ngx-bit';
import { BitRouterService } from '../bit-router.service';

@Component({
  selector: 'bit-page-header',
  templateUrl: './bit-page-header.component.html',
  styleUrls: ['./bit-page-header.component.scss']
})
export class BitPageHeaderComponent {
  constructor(public bit: BitService, public router: BitRouterService) {}
}
