import {Component, OnInit, AfterViewInit} from '@angular/core';
import {BitService} from 'dev-ngx-bit';

@Component({
  selector: 'app-operate-getroutename',
  templateUrl: './operate-getroutename.component.html',
  styleUrls: ['./operate-getroutename.component.scss']
})
export class OperateGetroutenameComponent implements OnInit, AfterViewInit {

  constructor(public bit: BitService) {
  }

  ngOnInit() {
    this.bit.registerLocales({});
  }

  ngAfterViewInit() {
  }
}
