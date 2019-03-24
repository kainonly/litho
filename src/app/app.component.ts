import {AfterViewInit, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  data = {
    name: 'kain'
  };
  x = 'asd';

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
  }
}
