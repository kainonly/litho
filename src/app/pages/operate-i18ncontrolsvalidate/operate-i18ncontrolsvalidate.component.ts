import {Component, OnInit, AfterViewInit} from '@angular/core';
import {BitService} from 'dev-ngx-bit';

@Component({
  selector: 'app-operate-i18ncontrolsvalidate',
  templateUrl: './operate-i18ncontrolsvalidate.component.html',
  styleUrls: ['./operate-i18ncontrolsvalidate.component.scss']
})
export class OperateI18ncontrolsvalidateComponent implements OnInit, AfterViewInit {

  constructor(public bit: BitService) {
  }

  ngOnInit() {
    this.bit.registerLocales({});
  }

  ngAfterViewInit() {
  }
}
