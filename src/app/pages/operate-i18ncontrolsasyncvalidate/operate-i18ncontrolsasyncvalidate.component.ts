import {Component, OnInit, AfterViewInit} from '@angular/core';
import {BitService} from 'dev-ngx-bit';

@Component({
  selector: 'app-operate-i18ncontrolsasyncvalidate',
  templateUrl: './operate-i18ncontrolsasyncvalidate.component.html',
  styleUrls: ['./operate-i18ncontrolsasyncvalidate.component.scss']
})
export class OperateI18ncontrolsasyncvalidateComponent implements OnInit, AfterViewInit {

  constructor(public bit: BitService) {
  }

  ngOnInit() {
    this.bit.registerLocales({});
  }

  ngAfterViewInit() {
  }
}
