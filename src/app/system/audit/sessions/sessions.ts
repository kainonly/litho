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
  signal,
  computed
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NzCardComponent } from 'ng-zorro-antd/card';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Subscription, switchMap, timer } from 'rxjs';

import { FlagSet, Global, SharedModule } from '@shared';
import { SessionsApi } from '@shared/apis/sessions-api';
import { User } from '@shared/models';

@Component({
  imports: [SharedModule],
  selector: 'app-system-sessions',
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
  readonly items = signal<User[]>([]);
  readonly selection = new FlagSet();
  readonly checked = computed(() => {
    const data = this.items();
    const sel = this.selection;
    return data.length > 0 && data.every(v => sel.has(v.id));
  });
  /** 是否部分选中（当前页有选中但未全选） */
  readonly indeterminate = computed(() => {
    if (this.checked()) {
      return false;
    }
    const data = this.items();
    const sel = this.selection;
    return data.some(v => sel.has(v.id));
  });

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

  /**
   * 选中一条数据
   * @param data 要选中的数据项
   */
  setSelection(data: User): void {
    this.selection.add(data.id);
  }

  /**
   * 取消选中一条数据
   * @param id 要取消选中的数据 ID
   */
  removeSelection(id: string): void {
    this.selection.delete(id);
  }

  /**
   * 设置当前页的选中状态
   * @param checked 是否全选当前页
   */
  setCurrentSelections(checked: boolean): void {
    const sel = this.selection;
    this.items().forEach(v => (checked ? sel.add(v.id) : sel.delete(v.id)));
  }

  /**
   * 清除指定的选中项
   * @param key 要清除的数据 ID
   */
  clearSelection(key: string): void {
    this.selection.delete(key);
  }

  /**
   * 清除所有选中项
   */
  clearSelections(): void {
    this.selection.clear();
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
