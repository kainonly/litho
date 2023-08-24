import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, debounceTime } from 'rxjs';

import { Cluster } from '@common/models/cluster';
import { Schedule } from '@common/models/schedule';
import { ClustersService } from '@common/services/clusters.service';
import { SchedulesService } from '@common/services/schedules.service';
import { Any, AnyDto } from '@weplanx/ng';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';

export interface ModalData {
  doc?: AnyDto<Schedule>;
}

@Component({
  selector: 'app-admin-workflows-schedules-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {
  form!: FormGroup;
  tips = {
    name: {
      default: {
        required: `服务名称不能为空`,
        pattern: `仅允许小写字母、数子、下划线`
      }
    },
    cluster_id: {
      default: {
        required: `集群不能为空`
      }
    },
    image: {
      default: {
        required: `镜像地址不能为空`
      }
    }
  };
  clusters$ = new BehaviorSubject<string>('');
  clustersItems: AnyDto<Cluster>[] = [];

  constructor(
    @Inject(NZ_MODAL_DATA)
    public data: ModalData,
    private modalRef: NzModalRef,
    private message: NzMessageService,
    private fb: FormBuilder,
    private schedules: SchedulesService,
    private clusters: ClustersService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.pattern(/[_a-z0-9]+/)]],
      cluster_id: ['', [Validators.required]],
      image: ['ccr.ccs.tencentyun.com/weplanx/schedule:latest', [Validators.required]]
    });
    if (this.data.doc) {
      this.form.get('cluster_id')?.disable();
      this.form.patchValue(this.data.doc);
    }
    this.clusters$
      .asObservable()
      .pipe(debounceTime(500))
      .subscribe(v => {
        this.getClusters(v);
      });
  }

  getClusters(v: string): void {
    this.clusters.find({ name: { $regex: '^' + v } }).subscribe(({ data }) => {
      this.clustersItems = [...data];
    });
  }

  close(): void {
    this.modalRef.triggerCancel();
  }

  submit(data: Any): void {
    if (!this.data.doc) {
      this.schedules.create(data, { xdata: { cluster_id: 'oid' } }).subscribe(() => {
        this.message.success(`数据更新成功`);
        this.modalRef.triggerOk();
      });
    } else {
      this.schedules
        .updateById(this.data.doc._id, { $set: data }, { xdata: { '$set->cluster_id': 'oid' } })
        .subscribe(() => {
          this.message.success(`数据更新成功`);
          this.modalRef.triggerOk();
        });
    }
  }
}
