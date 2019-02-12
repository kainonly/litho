import {Component, OnInit, AfterViewInit} from '@angular/core';
import {BitService} from 'dev-ngx-bit';

@Component({
  selector: 'app-operate-emptyarray',
  templateUrl: './operate-emptyarray.component.html',
  styleUrls: ['./operate-emptyarray.component.scss']
})
export class OperateEmptyarrayComponent implements OnInit, AfterViewInit {

  constructor(public bit: BitService) {
  }

  ngOnInit() {
    this.bit.registerLocales({});
  }

  ngAfterViewInit() {
  }
}
