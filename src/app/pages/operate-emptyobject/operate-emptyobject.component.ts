import {Component, OnInit, AfterViewInit} from '@angular/core';
import {BitService} from 'dev-ngx-bit';

@Component({
  selector: 'app-operate-emptyobject',
  templateUrl: './operate-emptyobject.component.html',
  styleUrls: ['./operate-emptyobject.component.scss']
})
export class OperateEmptyobjectComponent implements OnInit, AfterViewInit {

  constructor(public bit: BitService) {
  }

  ngOnInit() {
    this.bit.registerLocales({});
  }

  ngAfterViewInit() {
  }
}
