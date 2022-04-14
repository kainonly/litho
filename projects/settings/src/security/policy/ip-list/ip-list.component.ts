import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { forkJoin } from 'rxjs';

import { WpxService } from '@weplanx/common';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'wpx-settings-policy-ip-list',
  templateUrl: './ip-list.component.html'
})
export class IpListComponent implements OnInit {
  @Input() data!: Record<string, any>;
  form?: FormGroup;

  constructor(
    public wpx: WpxService,
    private modalRef: NzModalRef,
    private message: NzMessageService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    // TODO: 补充验证器
    this.form = this.fb.group({
      whitelist: this.fb.array([]),
      blacklist: this.fb.array([])
    });
    (<string[]>this.data['ip_whitelist']).forEach(v => {
      this.addWhitelist(v);
    });
    (<string[]>this.data['ip_blacklist']).forEach(v => {
      this.addBlacklist(v);
    });
  }

  get whitelist(): FormArray {
    return this.form?.get('whitelist') as FormArray;
  }

  addWhitelist(value?: string): void {
    this.whitelist.push(this.fb.control(value, [Validators.required]));
  }

  removeWhitelist(index: number): void {
    this.whitelist.removeAt(index);
  }

  get blacklist(): FormArray {
    return this.form?.get('blacklist') as FormArray;
  }

  addBlacklist(value?: string): void {
    this.blacklist.push(this.fb.control(value, [Validators.required]));
  }

  removeBlacklist(index: number): void {
    this.blacklist.removeAt(index);
  }

  close(): void {
    this.modalRef.triggerCancel();
  }

  submit(value: any): void {
    forkJoin([
      this.wpx.setVar('ip_whitelist', value.whitelist),
      this.wpx.setVar('ip_blacklist', value.blacklist)
    ]).subscribe(() => {
      this.message.success('设置成功');
      this.modalRef.triggerOk();
    });
  }
}
