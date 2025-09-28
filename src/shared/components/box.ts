import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ElementRef,
  inject,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  signal,
  SimpleChanges,
  TemplateRef,
  ViewChild
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
      [style.height]="
        !appFilter?.visible
          ? 'calc(100% - ' + appOffsetHeight + 'px)'
          : 'calc(100% - ' + (appOffsetHeight + appFilter!.height) + 'px)'
      "
      [nzBodyStyle]="{ height: 'calc(100% - ' + appBodyOffsetY + ')' }"
      [nzTitle]="appLeft"
      [nzExtra]="appRight"
      [nzLoading]="appLoading"
    >
      @if (appTabs) {
        <nz-card-tab>
          <ng-container *ngTemplateOutlet="appTabs"></ng-container>
        </nz-card-tab>
      }

      <ng-content></ng-content>
    </nz-card>

    <ng-template #totalRef let-total>Total of {{ total }} records</ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Box implements OnInit, OnChanges, AfterViewInit, OnDestroy {
  private cdr = inject(ChangeDetectorRef);

  @ViewChild('totalRef', { static: true }) totalRef!: TemplateRef<Any>;
  @ContentChild(NzTableComponent, { read: ElementRef, static: true }) ref?: ElementRef;

  @Input() appLeft?: TemplateRef<void>;
  @Input() appRight?: TemplateRef<void>;
  @Input() appLoading = false;
  @Input() appTabs?: TemplateRef<void>;

  @Input() appFilter?: Filter;

  @Input() appOffsetHeight = 0;
  @Input() appScrollX?: number;
  @Input() appScrollOffsetY = 100;
  @Input() appBodyOffsetY = '65px';
  scroll = signal<{ x: string; y: string }>({ x: '0px', y: '0px' });

  private resizeObserver?: ResizeObserver;

  ngOnInit(): void {
    if (!this.ref) {
      return;
    }
    this.resizeObserver = new ResizeObserver(entries => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        this.scroll.set({
          x: `${this.appScrollX ? this.appScrollX : width - 24}px`,
          y: `${height - this.appScrollOffsetY}px`
        });
      }
      this.cdr.detectChanges();
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!this.ref) {
      return;
    }
    if (changes['appScrollX']) {
      this.scroll.set({
        ...this.scroll(),
        x: changes['appScrollX'].currentValue
      });
      this.cdr.detectChanges();
    }
  }

  ngAfterViewInit(): void {
    if (this.ref) {
      this.resizeObserver!.observe(this.ref.nativeElement);
    }
  }

  ngOnDestroy(): void {
    if (this.ref && this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
  }
}
