import {Component, OnInit, AfterViewInit} from '@angular/core';
import {BitService} from 'dev-ngx-bit';

@Component({
  selector: 'app-operate-objecttomap',
  templateUrl: './operate-objecttomap.component.html',
  styleUrls: ['./operate-objecttomap.component.scss']
})
export class OperateObjecttomapComponent implements OnInit, AfterViewInit {

  constructor(public bit: BitService) {
  }

  ngOnInit() {
    this.bit.registerLocales({});
  }

  ngAfterViewInit() {
  }
}
