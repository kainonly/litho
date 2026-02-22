import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';

import { Global, SharedModule } from '@shared';
import { RoutesApi } from '@shared/apis/routes-api';
import { Any, Route } from '@shared/models';

import { tips } from './tips';

export interface GroupFormInput {
  nav: string;
  data?: Route;
}

@Component({
  imports: [SharedModule],
  selector: 'app-system-access-views-routes-group-form',
  templateUrl: './group-form.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GroupForm implements OnInit {
  input = inject<GroupFormInput>(NZ_MODAL_DATA);
  global = inject(Global);
  routes = inject(RoutesApi);

  private destroyRef = inject(DestroyRef);
  private modalRef = inject(NzModalRef);
  private message = inject(NzMessageService);
  private fb = inject(FormBuilder);

  form: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    active: [true, [Validators.required]]
  });
  tips = tips;

  ngOnInit(): void {
    if (this.input.data) {
      this.getData(this.input.data.id);
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

  close(): void {
    this.modalRef.triggerCancel();
  }

  submit(data: Any): void {
    const dto = { ...data };
    if (!this.input.data) {
      dto.nav = this.input.nav;
      dto.type = 1;
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
