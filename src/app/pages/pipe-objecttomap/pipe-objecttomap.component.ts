import {Component, OnInit, AfterViewInit} from '@angular/core';
import {BitService} from 'dev-ngx-bit';

@Component({
  selector: 'app-pipe-objecttomap',
  templateUrl: './pipe-objecttomap.component.html',
  styleUrls: ['./pipe-objecttomap.component.scss']
})
export class PipeObjecttomapComponent implements OnInit, AfterViewInit {

  constructor(public bit: BitService) {
  }

  ngOnInit() {
    this.bit.registerLocales({});
  }

  ngAfterViewInit() {
  }
}
