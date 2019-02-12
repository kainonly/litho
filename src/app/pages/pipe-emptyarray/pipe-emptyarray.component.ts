import {Component, OnInit, AfterViewInit} from '@angular/core';
import {BitService} from 'dev-ngx-bit';

@Component({
  selector: 'app-pipe-emptyarray',
  templateUrl: './pipe-emptyarray.component.html',
  styleUrls: ['./pipe-emptyarray.component.scss']
})
export class PipeEmptyarrayComponent implements OnInit, AfterViewInit {

  constructor(public bit: BitService) {
  }

  ngOnInit() {
    this.bit.registerLocales({});
  }

  ngAfterViewInit() {
  }
}
