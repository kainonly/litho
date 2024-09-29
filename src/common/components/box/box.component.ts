import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  signal,
  TemplateRef,
  ViewChild
} from '@angular/core';

import { Any } from '@common';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzTableComponent } from 'ng-zorro-antd/table';

@Component({
  standalone: true,
  imports: [CommonModule, NzCardModule],
  selector: 'app-box',
  template: `
    <nz-card
      [style.height.%]="100"
      [nzBodyStyle]="{ height: 'calc(100% - 64px)' }"
      [nzTitle]="appLeft"
      [nzExtra]="appRight"
    >
      <ng-content></ng-content>
    </nz-card>

    <ng-template #totalRef let-total>共计 {{ total }} 记录</ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoxComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() appLeft?: TemplateRef<void>;
  @Input() appRight?: TemplateRef<void>;

  @ViewChild('totalRef', { static: true }) totalRef!: TemplateRef<Any>;
  @ContentChild(NzTableComponent, { read: ElementRef, static: true }) ref?: ElementRef;

  @Input() appScrollX?: string;
  scroll = signal<{ x?: string; y: string }>({ y: '0px' });
  private resizeObserver?: ResizeObserver;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    if (this.ref) {
      this.resizeObserver = new ResizeObserver(entries => {
        for (const entry of entries) {
          const { width, height } = entry.contentRect;
          this.scroll.set({
            x: this.appScrollX ? this.appScrollX : width - 24 + 'px',
            y: height - 100 + 'px'
          });
        }
        this.cdr.detectChanges();
      });
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
