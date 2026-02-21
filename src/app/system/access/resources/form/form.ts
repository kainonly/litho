import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';

import { Global, SharedModule } from '@shared';
import { ResourcesApi } from '@shared/apis/resources-api';
import { Any, Resource } from '@shared/models';

import { tips } from './tips';

export interface FormInput {
  data?: Resource;
}

@Component({
  standalone: true,
  imports: [SharedModule],
  selector: 'app-system-access-resources-form',
  templateUrl: './form.html'
})
export class Form implements OnInit {
  input = inject<FormInput>(NZ_MODAL_DATA);
  global = inject(Global);
  resources = inject(ResourcesApi);

  private destroyRef = inject(DestroyRef);
  private modalRef = inject(NzModalRef);
  private message = inject(NzMessageService);
  private fb = inject(FormBuilder);

  form: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    code: ['', [Validators.required]],
    active: [true, [Validators.required]]
  });
  tips = tips;

  ngOnInit(): void {
    if (this.input.data) {
      this.getData(this.input.data.id);
    }
  }

  getData(id: string): void {
    this.resources
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
    const dto = {
      ...data
    };
    if (!this.input.data) {
      this.resources
        .create(dto)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(() => {
          this.message.success(`新增成功`);
          this.modalRef.triggerOk();
        });
    } else {
      dto.id = this.input.data.id;
      this.resources
        .update(dto)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(() => {
          this.message.success(`更新成功`);
          this.modalRef.triggerOk();
        });
    }
  }
}
