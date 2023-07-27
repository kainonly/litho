import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Logined } from '@common/models/logined';
import { LoginedService } from '@common/services/logined.service';
import { Any, Filter, WpxModel, WpxService } from '@weplanx/ng';

@Component({
  selector: 'app-admin-settings-logined',
  templateUrl: './logined.component.html'
})
export class LoginedComponent implements OnInit {
  model!: WpxModel<Logined>;
  form!: FormGroup;
  filter: Filter<Logined> = {};

  constructor(
    private wpx: WpxService,
    private fb: FormBuilder,
    private logined: LoginedService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({});
    this.model = this.wpx.setModel<Logined>('logined', this.logined);
    this.model.ready().subscribe(() => {
      this.getData(true);
    });
  }

  getData(refresh = false): void {
    if (refresh) {
      this.model.page = 1;
    }
    this.model.fetch(this.filter).subscribe(() => {
      console.debug('fetch:ok');
    });
  }

  clear(): void {
    this.form.reset();
    this.filter = {};
    this.getData();
  }

  search(data: Any): void {
    for (const [k, v] of Object.entries(data)) {
      if (v) {
        this.filter[k] = { $regex: `${v}` };
      }
    }
    this.getData();
  }
}
