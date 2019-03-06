import {AfterViewInit, Component, EventEmitter, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable, of} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      email: [null, [Validators.required]],
    });

  }

  ngAfterViewInit() {
  }
}
