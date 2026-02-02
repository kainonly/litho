import { HttpParams } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';

import { Global, SharedModule } from '@shared';
import { RoutesApi } from '@shared/apis/routes';
import { Any, Menu, Route } from '@shared/models';

import { tips } from './tips';

export interface FormInput {
  menu: Menu;
  data?: Route;
}

@Component({
  imports: [SharedModule],
  selector: 'app-settings-access-views-routes-form',
  templateUrl: './form.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GroupForm implements OnInit {
  input = inject<FormInput>(NZ_MODAL_DATA);
  global = inject(Global);
  routes = inject(RoutesApi);

  private destroyRef = inject(DestroyRef);
  private modalRef = inject(NzModalRef);
  private message = inject(NzMessageService);
  private fb = inject(FormBuilder);

  form: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    type: [1, [Validators.required]],
    pid: [0],
    icon: [''],
    link: [''],
    active: [true, [Validators.required]]
  });
  tips = tips;
  groupItems = signal<Route[]>([]);

  ngOnInit(): void {
    this.form.get('pid')?.disable();
    this.form.get('icon')?.disable();
    this.form.get('link')?.disable();

    this.getGroupItems();

    if (this.input.data) {
      this.form.get('type')?.disable();
      this.getData(this.input.data.id);
    }

    this.form
      .get('type')
      ?.valueChanges.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(v => {
        this.updateFormStatus(v);
      });
  }

  updateFormStatus(type: number): void {
    if (type === 1) {
      this.form.get('pid')?.disable();
      this.form.get('icon')?.disable();
      this.form.get('link')?.disable();
    } else {
      this.form.get('pid')?.enable();
      this.form.get('icon')?.enable();
      this.form.get('link')?.enable();
    }
  }

  getData(id: string): void {
    this.routes
      .findById(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(data => {
        this.form.patchValue(data);
      });
  }

  getGroupItems(): void {
    const http = new HttpParams();
    this.routes
      .find(http, { page: 1, pagesize: 1000 })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(({ data }) => {
        this.groupItems.set(data);
      });
  }

  close(): void {
    this.modalRef.triggerCancel();
  }

  submit(data: Any): void {
    const dto = {
      ...data
    };
    if (!dto.pid) {
      delete dto.pid;
    }
    if (!this.input.data) {
      dto.menu_id = this.input.menu.id;
      this.routes
        .create(dto)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(() => {
          this.message.success(`新增成功`);
          this.modalRef.triggerOk();
        });
    } else {
      dto.id = this.input.data.id;
      this.routes
        .update(dto)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(() => {
          this.message.success(`更新成功`);
          this.modalRef.triggerOk();
        });
    }
  }
}
