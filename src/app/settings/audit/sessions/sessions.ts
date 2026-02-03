import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  inject,
  DestroyRef,
  viewChild,
  ElementRef,
  signal
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NzCardComponent } from 'ng-zorro-antd/card';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Subscription, switchMap, timer } from 'rxjs';

import { Global, SharedModule } from '@shared';
import { SessionsApi } from '@shared/apis/sessions-api';
import { User } from '@shared/models';

@Component({
  imports: [SharedModule],
  selector: 'app-settings-sessions',
  templateUrl: './sessions.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Sessions implements OnInit, AfterViewInit, OnDestroy {
  global = inject(Global);
  sessions = inject(SessionsApi);

  private destroyRef = inject(DestroyRef);
  private modal = inject(NzModalService);
  private message = inject(NzMessageService);

  card = viewChild(NzCardComponent, { read: ElementRef });

  searchText = signal<string>('');
  items = signal<User[]>([]);
  interval = 15;

  y = '0px';
  private refresh!: Subscription;
  private resizeObserver!: ResizeObserver;

  ngOnInit(): void {
    this.getData();
    this.resizeObserver = new ResizeObserver(entries => {
      for (const entry of entries) {
        const { height } = entry.contentRect;
        this.y = `${height - 180}px`;
      }
    });
  }

  ngAfterViewInit(): void {
    this.resizeObserver.observe(this.card()!.nativeElement);
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
        takeUntilDestroyed(this.destroyRef),
        switchMap(() => this.sessions.get())
      )
      .subscribe(data => {
        this.items.set([
          ...data.filter(v => {
            if (this.searchText() !== '') {
              return !!v.phone.match(`^${this.searchText()}`);
            }
            return v;
          })
        ]);
      });
  }

  clearSearch(): void {
    this.searchText.set('');
    this.getData();
  }

  kick(data: User): void {
    this.modal.confirm({
      nzTitle: `您确定要中断该会话吗?`,
      nzContent: data.email,
      nzOkDanger: true,
      nzOnOk: () => {
        this.sessions
          .kick(data.id)
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe(() => {
            this.message.success(`会话已中断`);
          });
      }
    });
  }

  bulkDelete(): void {
    this.modal.confirm({
      nzTitle: `您确定要中断选中的会话吗?`,
      nzOkDanger: true,
      nzOnOk: () => {
        this.sessions
          .clear()
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe(() => {
            this.message.success(`会话已中断`);
          });
      }
    });
  }
}
