import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { Any, AnyDto } from '@weplanx/ng';
import { NzContextMenuService, NzDropdownMenuComponent } from 'ng-zorro-antd/dropdown';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

import { WpxCategoriesService } from './categories.service';
import { FormComponent, ModalData } from './form/form.component';
import { WpxCategory } from './types';

@Component({
  selector: 'wpx-categories',
  templateUrl: './categories.component.html',
  styles: [
    `
      .cdk-drag-preview {
        display: table;
      }

      .cdk-drag-placeholder {
        opacity: 0;
      }
    `
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => WpxCategoriesComponent),
      multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WpxCategoriesComponent implements ControlValueAccessor, OnInit {
  @Input({ required: true }) wpxType!: string;

  value: string[] = [];
  items: AnyDto<WpxCategory>[] = [];
  loading = false;
  actived?: AnyDto<WpxCategory>;
  panel = false;

  private onChange?: (value: string[]) => void;
  private onTouched?: () => void;

  constructor(
    private categories: WpxCategoriesService,
    private modal: NzModalService,
    private contextMenu: NzContextMenuService,
    private message: NzMessageService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  registerOnChange(fn: Any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: Any): void {
    this.onTouched = fn;
  }

  writeValue(data: Any): void {
    this.value = data ?? [];
  }

  update(value: string[]): void {
    this.onChange!(value);
  }

  getData(): void {
    this.loading = true;
    this.categories
      .find(
        { type: this.wpxType },
        {
          sort: { sort: 1 }
        }
      )
      .subscribe(({ data }) => {
        this.items = [...data];
        this.loading = false;
        this.cdr.detectChanges();
      });
  }

  openPanel(): void {
    this.panel = true;
  }

  drop(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.items, event.previousIndex, event.currentIndex);
    this.categories
      .sort(
        'sort',
        this.items.map(v => v._id)
      )
      .subscribe(() => {
        this.getData();
        this.message.success(`数据更新成功`);
      });
  }

  closePanel(): void {
    this.panel = false;
  }

  openMenu($event: MouseEvent, menu: NzDropdownMenuComponent, data: AnyDto<WpxCategory>): void {
    this.actived = data;
    this.contextMenu.create($event, menu);
  }

  openForm(doc?: AnyDto<WpxCategory>): void {
    this.modal.create<FormComponent, ModalData>({
      nzTitle: !doc ? `新增` : `编辑`,
      nzContent: FormComponent,
      nzData: {
        type: this.wpxType,
        doc
      },
      nzOnOk: () => {
        this.getData();
      }
    });
  }

  delete(data: AnyDto<WpxCategory>): void {
    this.modal.confirm({
      nzTitle: `您确认要删除吗?`,
      nzContent: `[${data.name}]`,
      nzOkText: `是的`,
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => {
        this.categories.delete(data._id).subscribe(() => {
          this.getData();
          this.message.success(`数据删除完成`);
        });
      },
      nzCancelText: `否`
    });
  }
}
