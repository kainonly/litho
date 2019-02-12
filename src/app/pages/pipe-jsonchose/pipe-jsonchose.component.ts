import {Component, OnInit, AfterViewInit} from '@angular/core';
import {BitService} from 'dev-ngx-bit';

@Component({
  selector: 'app-pipe-jsonchose',
  templateUrl: './pipe-jsonchose.component.html',
  styleUrls: ['./pipe-jsonchose.component.scss']
})
export class PipeJsonchoseComponent implements OnInit, AfterViewInit {

  constructor(public bit: BitService) {
  }

  ngOnInit() {
    this.bit.registerLocales({});
  }

  ngAfterViewInit() {
  }
}
