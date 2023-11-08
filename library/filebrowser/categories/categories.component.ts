import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Any, AnyDto, WpxApi } from '@weplanx/ng';
import { WpxCategory } from '@weplanx/ng/categories';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';

import { WpxFile } from '../types';

export interface CategoriesInput {
  docs: AnyDto<WpxFile>[];
  api: WpxApi<WpxFile>;
  categories: AnyDto<WpxCategory>[];
}

@Component({
  selector: 'wpx-filebrowser-categories',
  templateUrl: './categories.component.html'
})
export class CategoriesComponent implements OnInit {
  form!: FormGroup;

  constructor(
    @Inject(NZ_MODAL_DATA) public data: CategoriesInput,
    private modalRef: NzModalRef,
    private message: NzMessageService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      categories: [[]]
    });
  }

  close(): void {
    this.modalRef.triggerCancel();
  }

  submit(data: Any): void {
    this.data.api
      .update(
        { _id: { $in: this.data.docs.map(v => v._id) } },
        { $set: data },
        {
          xfilter: { '_id->$in': 'oids' },
          xdata: { '$set->categories': 'oids' }
        }
      )
      .subscribe(() => {
        this.data.docs.forEach(value => (value.categories = data.categories));
        this.message.success(`Update successful`);
        this.modalRef.triggerOk();
      });
  }
}
