import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { Builder, Field, FieldTypeDict } from '@common/models/builder';
import { BuildersService } from '@common/services/builders.service';
import { AnyDto } from '@weplanx/ng';
import { NzModalService } from 'ng-zorro-antd/modal';

import { FieldComponent, FieldInput } from '../field/field.component';

@Component({
  selector: 'app-index-builders-schema',
  templateUrl: './schema.component.html'
})
export class SchemaComponent implements OnInit, OnDestroy {
  data?: AnyDto<Builder>;
  fieldTypeDict = FieldTypeDict;

  private id!: string;
  private updated!: Subscription;

  constructor(
    private builders: BuildersService,
    private route: ActivatedRoute,
    private modal: NzModalService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(data => {
      this.id = data['id'];
      this.getData();
    });
    this.updated = this.builders.updated.subscribe(id => {
      if (this.id === id) {
        this.getData();
      }
    });
  }

  ngOnDestroy(): void {
    this.updated.unsubscribe();
  }

  getData(): void {
    this.builders.findById(this.id).subscribe(data => {
      this.data = data;
      console.log(data.schema);
    });
  }

  openField(field?: Field): void {
    this.modal.create<FieldComponent, FieldInput>({
      nzTitle: !field ? '创建字段' : `编辑【${field.name}】字段`,
      nzWidth: 960,
      nzContent: FieldComponent,
      nzData: {
        doc: this.data!,
        field
      },
      nzOnOk: () => {
        this.getData();
      }
    });
  }
}
