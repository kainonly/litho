import {Component, OnInit, AfterViewInit} from '@angular/core';
import {BitService} from 'dev-ngx-bit';

@Component({
  selector: 'app-pipe-jsonparse',
  templateUrl: './pipe-jsonparse.component.html',
  styleUrls: ['./pipe-jsonparse.component.scss']
})
export class PipeJsonparseComponent implements OnInit, AfterViewInit {

  constructor(public bit: BitService) {
  }

  ngOnInit() {
    this.bit.registerLocales({});
  }

  ngAfterViewInit() {
  }
}
