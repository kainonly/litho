import {Component, OnInit, AfterViewInit} from '@angular/core';
import {BitService} from 'dev-ngx-bit';

@Component({
  selector: 'app-curd-originlists',
  templateUrl: './curd-originlists.component.html',
  styleUrls: ['./curd-originlists.component.scss']
})
export class CurdOriginlistsComponent implements OnInit, AfterViewInit {

  constructor(public bit: BitService) {
  }

  ngOnInit() {
    this.bit.registerLocales({});
  }

  ngAfterViewInit() {
  }
}
