import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { AppService } from '@app';
import { User } from '@common/models/user';
import { UsersService } from '@common/services/users.service';
import { AnyDto, WpxList } from '@weplanx/ng';
import { NzCardComponent } from 'ng-zorro-antd/card';
import { NzContextMenuService, NzDropdownMenuComponent } from 'ng-zorro-antd/dropdown';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

import { SessionsService } from './sessions.service';

@Component({
  selector: 'app-admin-settings-sessions',
  templateUrl: './sessions.component.html'
})
export class SessionsComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(NzCardComponent, { read: ElementRef, static: true }) card!: ElementRef;

  list = new WpxList<AnyDto<User>>('_id');
  interval = 15;
  actived?: AnyDto<User>;

  y = '0px';
  private refresh!: Subscription;
  private resizeObserver!: ResizeObserver;

  constructor(
    public app: AppService,
    private sessions: SessionsService,
    private users: UsersService,
    private message: NzMessageService,
    private modal: NzModalService,
    private contextMenu: NzContextMenuService
  ) {}

  ngOnInit(): void {
    this.getData();
    this.resizeObserver = new ResizeObserver(entries => {
      for (const entry of entries) {
        const { height } = entry.contentRect;
        this.y = height - 180 + 'px';
      }
    });
  }

  ngAfterViewInit(): void {
    this.resizeObserver.observe(this.card.nativeElement);
  }

  ngOnDestroy(): void {
    this.resizeObserver.disconnect();
    this.refresh.unsubscribe();
  }

  getData(due = 0): void {
    if (this.refresh) {
      this.refresh.unsubscribe();
    }
    this.refresh = timer(due, this.interval * 1000)
      .pipe(
        switchMap(() => this.sessions.get()),
        switchMap(v =>
          this.users.find(
            {
              _id: { $in: v }
            },
            {
              xfilter: { '_id->$in': 'oids' }
            }
          )
        )
      )
      .subscribe(({ data }) => {
        this.list.data = [
          ...data.filter(v => {
            if (this.list.searchText !== '') {
              return !!v.email.match(`^${this.list.searchText}`);
            }
            return v;
          })
        ];
        console.debug(`session: refreshed`);
      });
  }

  clearSearch(): void {
    this.list.searchText = '';
    this.getData();
  }

  openActions($event: MouseEvent, menu: NzDropdownMenuComponent, data: AnyDto<User>): void {
    this.actived = data;
    this.contextMenu.create($event, menu);
  }

  delete(doc: AnyDto<User>): void {
    this.modal.confirm({
      nzTitle: `您确定要中断【${doc.email}】的会话吗？`,
      nzOkDanger: true,
      nzOnOk: () => {
        this.sessions.delete(doc._id).subscribe(() => {
          this.message.success($localize`会话已中断`);
        });
      }
    });
  }

  bulkDelete(): void {
    this.modal.confirm({
      nzTitle: '您确定要中断选中的会话吗？',
      nzOkDanger: true,
      nzOnOk: () => {
        this.sessions.clear().subscribe(() => {
          this.message.success($localize`会话已中断`);
        });
      }
    });
  }
}
