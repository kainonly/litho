import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { BehaviorSubject, debounceTime } from 'rxjs';

import { Audit } from '@common/models/audit';
import { User } from '@common/models/user';
import { AuditService } from '@common/services/audit.service';
import { UsersService } from '@common/services/users.service';
import { Any, AnyDto, Filter, WpxModel, WpxService } from '@weplanx/ng';

@Component({
  selector: 'app-admin-settings-audit',
  templateUrl: './audit.component.html'
})
export class AuditComponent implements OnInit {
  model!: WpxModel<Audit>;
  userKv?: Record<string, AnyDto<User>>;

  form!: FormGroup;
  filter: Filter<Audit> = {};
  searchUsers$ = new BehaviorSubject<string>('');
  searchUserItems: AnyDto<User>[] = [];

  userDetail?: AnyDto<User>;

  constructor(
    private wpx: WpxService,
    private fb: FormBuilder,
    private audit: AuditService,
    private users: UsersService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      timestamp: [],
      user_id: [],
      method: [],
      path: []
    });
    this.model = this.wpx.setModel<Audit>('audit', this.audit);
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

  get path(): FormControl {
    return this.form.get('path') as FormControl;
  }

  search(data: Any): void {
    this.filter = {};
    if (data.timestamp && data.length !== 0) {
      this.filter.timestamp = {
        $gte: data.timestamp[0].toUTCString(),
        $lt: data.timestamp[1].toUTCString()
      };
    }
    if (data.method && data.method.length !== 0 && data.method.length !== 2) {
      this.filter['metadata.method'] = { $in: data.method };
    }
    if (data.user_id && data.user_id.length !== 0) {
      this.filter['metadata.user_id'] = { $in: data.user_id };
    }
    if (data.path) {
      this.filter['metadata.path'] = { $regex: '^' + data.path };
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
