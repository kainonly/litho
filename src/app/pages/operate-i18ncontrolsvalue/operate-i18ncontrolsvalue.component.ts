import {Component, OnInit, AfterViewInit} from '@angular/core';
import {BitService} from 'dev-ngx-bit';

@Component({
  selector: 'app-operate-i18ncontrolsvalue',
  templateUrl: './operate-i18ncontrolsvalue.component.html',
  styleUrls: ['./operate-i18ncontrolsvalue.component.scss']
})
export class OperateI18ncontrolsvalueComponent implements OnInit, AfterViewInit {

  constructor(public bit: BitService) {
  }

  ngOnInit() {
    this.bit.registerLocales({});
  }

  ngAfterViewInit() {
  }
}
