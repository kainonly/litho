import {Component, OnInit, AfterViewInit} from '@angular/core';
import {BitService} from 'dev-ngx-bit';

@Component({
  selector: 'app-pipe-emptyobject',
  templateUrl: './pipe-emptyobject.component.html',
  styleUrls: ['./pipe-emptyobject.component.scss']
})
export class PipeEmptyobjectComponent implements OnInit, AfterViewInit {

  constructor(public bit: BitService) {
  }

  ngOnInit() {
    this.bit.registerLocales({});
  }

  ngAfterViewInit() {
  }
}
