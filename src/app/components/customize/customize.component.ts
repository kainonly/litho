import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  forwardRef,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

import { Graph } from '@antv/x6';

@Component({
  selector: 'app-customize',
  template: ` <div #ref></div> `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomizeComponent),
      multi: true
    }
  ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomizeComponent implements ControlValueAccessor, AfterViewInit {
  /**
   * 视图
   */
  @ViewChild('ref', { static: true }) ref!: ElementRef;

  /**
   * 默认值
   */
  $value: BehaviorSubject<any> = new BehaviorSubject<any>({});

  /**
   * 图
   * @private
   */
  private graph!: Graph;
  private onChange?: (value: any) => void;
  private onTouched?: () => void;

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  writeValue(value: any): void {
    this.$value.next(value);
  }

  ngAfterViewInit(): void {
    this.graph = new Graph({
      container: this.ref.nativeElement,
      width: 500,
      height: 300,
      grid: true,
      background: {
        color: '#f5f5f5'
      }
    });
    this.graph.on('cell:change:*', () => {
      this.onChange!(this.graph.model.toJSON());
    });
    this.$value.subscribe(value => {
      if (value) {
        this.graph.fromJSON(value);
      }
    });
  }
}
