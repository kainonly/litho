import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { BehaviorSubject, debounceTime } from 'rxjs';

import { Logined } from '@common/models/logined';
import { User } from '@common/models/user';
import { LoginedService } from '@common/services/logined.service';
import { UsersService } from '@common/services/users.service';
import { Any, AnyDto, Filter, WpxModel, WpxService } from '@weplanx/ng';
import { NzDrawerService } from 'ng-zorro-antd/drawer';

@Component({
  selector: 'app-admin-settings-logined',
  templateUrl: './logined.component.html'
})
export class LoginedComponent implements OnInit {
  model!: WpxModel<Logined>;
  userKv?: Record<string, AnyDto<User>>;

  form!: FormGroup;
  filter: Filter<Logined> = {};
  searchUsers$ = new BehaviorSubject<string>('');
  searchUserItems: AnyDto<User>[] = [];

  userDetail?: AnyDto<User>;

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
    this.model
      .ready({
        'timestamp->$gte': 'date',
        'timestamp->$lt': 'date',
        'metadata.user_id->$in': 'oids'
      })
      .subscribe(() => {
        this.getData(true);
      });
    this.searchUsers$
      .asObservable()
      .pipe(debounceTime(500))
      .subscribe(v => {
        this.getUsers(v);
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
            '_id->$in': 'oids'
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

  getUsers(v: string): void {
    this.users
      .find({
        $or: [{ email: { $regex: '^' + v } }, { name: { $regex: '^' + v } }]
      })
      .subscribe(({ data }) => {
        this.searchUserItems = [...data];
      });
  }

  clear(): void {
    this.form.reset();
    this.filter = {};
    this.getData();
  }

  get client_ip(): FormControl {
    return this.form.get('client_ip') as FormControl;
  }

  search(data: Any): void {
    this.filter = {};
    if (data.timestamp && data.length !== 0) {
      this.filter.timestamp = {
        $gte: data.timestamp[0].toUTCString(),
        $lt: data.timestamp[1].toUTCString()
      };
    }
    if (data.source && data.source.length !== 0 && data.source.length !== 2) {
      this.filter['metadata.source'] = { $in: data.source };
    }
    if (data.user_id && data.user_id.length !== 0) {
      this.filter['metadata.user_id'] = { $in: data.user_id };
    }
    if (data.client_ip) {
      this.filter['metadata.client_ip'] = data.client_ip;
    }
    this.getData(true);
  }

  openUserDetail(data: AnyDto<User>): void {
    this.userDetail = data;
  }

  closeUserDetail(): void {
    this.userDetail = undefined;
  }
}
