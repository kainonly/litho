import {Component, OnInit, AfterViewInit} from '@angular/core';
import {BitService} from 'dev-ngx-bit';

@Component({
  selector: 'app-operate-asyncvalidator',
  templateUrl: './operate-asyncvalidator.component.html',
  styleUrls: ['./operate-asyncvalidator.component.scss']
})
export class OperateAsyncvalidatorComponent implements OnInit, AfterViewInit {

  constructor(public bit: BitService) {
  }

  ngOnInit() {
    this.bit.registerLocales({});
  }

  ngAfterViewInit() {
  }
}
