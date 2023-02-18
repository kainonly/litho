import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { WpxService } from '@weplanx/ng';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-admin-extend-openapi',
  templateUrl: './openapi.component.html'
})
export class OpenapiComponent implements OnInit {
  tips = {
    openapi_url: {
      default: {
        required: $localize`The openapi url cannot be empty`
      }
    },
    openapi_key: {
      default: {
        required: $localize`The openapi app key cannot be empty`
      }
    },
    openapi_secret: {
      default: {
        required: $localize`The openapi app secret cannot be empty`
      }
    }
  };
  @Input() values!: Record<string, any>;
  form!: FormGroup;

  constructor(
    public wpx: WpxService,
    private modalRef: NzModalRef,
    private message: NzMessageService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      openapi_url: [null, [Validators.required]],
      openapi_key: [null, [Validators.required]],
      openapi_secret: [null, [Validators.required]]
    });
    this.form.patchValue({
      openapi_url: this.values['openapi_url'],
      openapi_key: this.values['openapi_key']
    });
  }

  close(): void {
    this.modalRef.triggerCancel();
  }

  submit(data: any): void {
    this.wpx.setValues(data).subscribe(() => {
      this.message.success($localize`Data update complete`);
      this.modalRef.triggerOk();
    });
  }
}
