import {Component, OnInit, AfterViewInit} from '@angular/core';
import {BitService} from 'dev-ngx-bit';

@Component({
  selector: 'app-operate-objecttoarray',
  templateUrl: './operate-objecttoarray.component.html',
  styleUrls: ['./operate-objecttoarray.component.scss']
})
export class OperateObjecttoarrayComponent implements OnInit, AfterViewInit {

  constructor(public bit: BitService) {
  }

  ngOnInit() {
    this.bit.registerLocales({});
  }

  ngAfterViewInit() {
  }
}
