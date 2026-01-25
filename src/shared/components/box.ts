import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChild,
  effect,
  ElementRef,
  input,
  OnDestroy,
  signal,
  TemplateRef,
  viewChild
} from '@angular/core';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzTableComponent } from 'ng-zorro-antd/table';

import { Filter } from '@shared';
import { Any } from '@shared/models';

@Component({
  standalone: true,
  imports: [CommonModule, NzCardModule],
  selector: 'app-box',
  template: `
    <nz-card
      [style.height]="cardHeight()"
      [nzBodyStyle]="{ height: 'calc(100% - ' + appBodyOffsetY() + ')' }"
      [nzTitle]="appLeft()"
      [nzExtra]="appRight()"
      [nzLoading]="appLoading()"
    >
      @if (appTabs()) {
        <nz-card-tab>
          <ng-container *ngTemplateOutlet="appTabs()"></ng-container>
        </nz-card-tab>
      }

      <ng-content></ng-content>
    </nz-card>

    <ng-template #totalRef let-total>共计 {{ total }} 记录</ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Box implements AfterViewInit, OnDestroy {
  totalRef = viewChild.required<TemplateRef<Any>>(`totalRef`);
  ref = contentChild(NzTableComponent, { read: ElementRef });

  readonly appTabs = input<TemplateRef<void> | undefined>();
  readonly appLeft = input<TemplateRef<void> | undefined>();
  readonly appRight = input<TemplateRef<void> | undefined>();

  readonly appFilter = input<Filter | undefined>();
  readonly appLoading = input(false);

  readonly appOffsetHeight = input(0);
  readonly appScrollX = input<number | undefined>();
  readonly appScrollOffsetY = input(100);
  readonly appBodyOffsetY = input('64px');

  private readonly size = signal({ width: 0, height: 0 });

  readonly scroll = computed(() => ({
    x: `${this.appScrollX() ?? this.size().width - 24}px`,
    y: `${this.size().height - this.appScrollOffsetY()}px`
  }));
  readonly cardHeight = computed(() => {
    const filter = this.appFilter();
    const base = this.appOffsetHeight();

    if (!filter?.visible()) {
      return `calc(100% - ${base}px)`;
    }

    return `calc(100% - ${base + filter.height()}px)`;
  });

  private resizeObserver?: ResizeObserver;

  constructor() {
    effect(() => {
      this.scroll();
    });
  }

  ngAfterViewInit(): void {
    const refEl = this.ref();
    if (!refEl) {
      return;
    }
    this.resizeObserver = new ResizeObserver(entries => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        this.size.set({ width, height });
      }
    });

    this.resizeObserver.observe(refEl.nativeElement);
  }

  ngOnDestroy(): void {
    this.resizeObserver?.disconnect();
  }
}
