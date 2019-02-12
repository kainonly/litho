import {Component, OnInit, AfterViewInit} from '@angular/core';
import {BitService} from 'dev-ngx-bit';

@Component({
  selector: 'app-operate-factorylocales',
  templateUrl: './operate-factorylocales.component.html',
  styleUrls: ['./operate-factorylocales.component.scss']
})
export class OperateFactorylocalesComponent implements OnInit, AfterViewInit {

  constructor(public bit: BitService) {
  }

  ngOnInit() {
    this.bit.registerLocales({});
  }

  ngAfterViewInit() {
  }
}
