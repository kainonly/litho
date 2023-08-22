import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { DatasetsService } from '@common/services/datasets.service';
import { Any } from '@weplanx/ng';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-admin-datasets-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {
  form!: FormGroup;
  tips = {
    name: {
      default: {
        required: `集合名称不能为空`
      }
    },
    kind: {
      default: {
        required: `集合类型不能为空`
      }
    }
  };
  formatterDay = (value: number): string => `${value} 天`;

  constructor(
    private modalRef: NzModalRef,
    private message: NzMessageService,
    private fb: FormBuilder,
    private datasets: DatasetsService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      kind: ['collection', [Validators.required]]
    });
    this.form.get('kind')!.valueChanges.subscribe(value => {
      this.initOption(value);
    });
  }

  initOption(kind: string): void {
    if (kind === 'timeseries') {
      this.form.addControl(
        'option',
        this.fb.group({
          time: ['timestamp', [Validators.required]],
          meta: ['metadata', [Validators.required]],
          expire: [0, [Validators.required]]
        })
      );
    } else {
      this.form.removeControl('option');
    }
  }

  close(): void {
    this.modalRef.triggerCancel();
  }

  submit(data: Any): void {
    this.datasets.create(data).subscribe(() => {
      this.message.success(`数据更新成功`);
      this.modalRef.triggerOk();
    });
  }
}
