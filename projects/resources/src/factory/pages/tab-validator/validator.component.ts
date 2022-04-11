import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { AnyDto, Page, updateFormGroup } from '@weplanx/common';
import { JoinedEditorOptions } from 'ng-zorro-antd/code-editor/typings';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzNotificationService } from 'ng-zorro-antd/notification';

import { PagesSerivce } from '../pages.serivce';

declare const monaco: any;

@Component({
  selector: 'wpx-resources-factory-pages-validator',
  templateUrl: './validator.component.html'
})
export class ValidatorComponent implements OnInit {
  key!: string;
  private page!: AnyDto<Page>;
  form?: FormGroup;

  option: JoinedEditorOptions = {
    language: 'json'
  };

  constructor(
    private pages: PagesSerivce,
    private fb: FormBuilder,
    private message: NzMessageService,
    private notification: NzNotificationService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(v => {
      this.key = v['key'];
      this.pages.key$.next(v['key']);
      this.getData();
    });
  }

  getData(): void {
    this.pages.findOneById(this.key).subscribe(v => {
      this.page = v;
      const value = `{"$schema": "http://json-schema.org/draft-04/schema"}`;
      this.form = this.fb.group({
        validator: [value, [Validators.required]]
      });
      if (this.page?.schema?.validator) {
        this.form.setValue({
          validator: JSON.stringify(this.page.schema.validator)
        });
      }
    });
  }

  initialized(e: any): void {
    setTimeout(() => {
      e.getAction('editor.action.formatDocument').run();
    }, 50);
    e.addAction({
      id: 'submit',
      label: '保存',
      keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS],
      precondition: null,
      keybindingContext: null,
      contextMenuGroupId: 'navigation',
      contextMenuOrder: 1.5,
      run: () => {
        e.getAction('editor.action.formatDocument').run();
        if (this.form) {
          updateFormGroup(Object.values(this.form.controls));
          this.submit(this.form.value);
        }
      }
    });
  }

  submit(data: any): void {
    this.pages.updateValidator(this.page._id, data.validator).subscribe(v => {
      if (!v.code) {
        this.message.success('验证器已更新');
      } else {
        this.notification.error('操作失败', v.message);
      }
    });
  }
}
