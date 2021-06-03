import { Component } from '@angular/core';
import { BitService } from 'ngx-bit';
import { BitRouterService } from '../bit-router.service';

@Component({
  selector: 'bit-content',
  templateUrl: './bit-content.component.html',
  styleUrls: ['./bit-content.component.scss']
})
export class BitContentComponent {
  constructor(
    public bit: BitService,
    public router: BitRouterService
  ) {
  }

}
