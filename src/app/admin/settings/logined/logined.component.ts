import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Logined } from '@common/models/logined';
import { User } from '@common/models/user';
import { LoginedService } from '@common/services/logined.service';
import { UsersService } from '@common/services/users.service';
import { Any, AnyDto, Filter, WpxModel, WpxService } from '@weplanx/ng';

@Component({
  selector: 'app-admin-settings-logined',
  templateUrl: './logined.component.html'
})
export class LoginedComponent implements OnInit {
  model!: WpxModel<Logined>;
  form!: FormGroup;
  filter: Filter<Logined> = {};
  userKv?: Record<string, AnyDto<User>>;

  constructor(
    private wpx: WpxService,
    private fb: FormBuilder,
    private logined: LoginedService,
    private users: UsersService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      timestamp: [],
      source: [],
      user_id: [],
      client_ip: []
    });
    this.model = this.wpx.setModel<Logined>('logined', this.logined);
    this.model.ready().subscribe(() => {
      this.getData(true);
    });
  }

  getData(refresh = false): void {
    if (refresh) {
      this.model.page = 1;
    }
    this.model.fetch(this.filter).subscribe(({ data }) => {
      this.getUserKv(data.map(v => v.metadata.user_id));
      console.debug('fetch:ok');
    });
  }

  getUserKv(ids: string[]): void {
    this.users
      .find(
        {
          _id: { $in: ids }
        },
        {
          xfilter: {
            '_id.$in': 'oids'
          }
        }
      )
      .subscribe(({ data }) => {
        const kv: Record<string, AnyDto<User>> = {};
        data.forEach(value => {
          kv[value._id] = value;
        });
        this.userKv = kv;
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
