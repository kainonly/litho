import {Component, OnInit, AfterViewInit} from '@angular/core';
import {BitService} from 'dev-ngx-bit';

@Component({
  selector: 'app-pipe-objecttoarray',
  templateUrl: './pipe-objecttoarray.component.html',
  styleUrls: ['./pipe-objecttoarray.component.scss']
})
export class PipeObjecttoarrayComponent implements OnInit, AfterViewInit {

  constructor(public bit: BitService) {
  }

  ngOnInit() {
    this.bit.registerLocales({});
  }

  ngAfterViewInit() {
  }
}
