import { HttpClient } from '@angular/common/http';
import { Directive, forwardRef, OnDestroy, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadComponent, NzUploadFile } from 'ng-zorro-antd/upload';

import { WpxService } from '../wpx.service';

@Directive({
  selector: 'nz-upload[wpxUpload]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => WpxUploadDirective),
      multi: true
    }
  ]
})
export class WpxUploadDirective implements ControlValueAccessor, OnInit, OnDestroy {
  value?: string;
  onChange?: (value: any) => void;
  onTouched?: () => void;
  private key?: string;
  private nzChange$?: Subscription;

  constructor(
    private wpx: WpxService,
    private http: HttpClient,
    private message: NzMessageService,
    private nzUploadComponent: NzUploadComponent
  ) {
    if (!wpx.upload) {
      throw new Error('上传配置不能为空');
    }
    const option = wpx.upload;
    nzUploadComponent.nzShowUploadList = false;
    nzUploadComponent.nzSize = option.size ?? 5120;
    nzUploadComponent.nzAction = option.url;
    nzUploadComponent.nzData = (file: NzUploadFile): Observable<any> =>
      http.get<any>(option.presignedUrl!).pipe(
        map(v => {
          this.key = v.key;
          return v;
        })
      );
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  writeValue(value: any): void {
    this.value = value;
  }

  ngOnInit(): void {
    this.nzUploadComponent.nzChange.subscribe(info => {
      if (info.type === 'success') {
        this.onChange!(this.key);
      }
    });
  }

  ngOnDestroy(): void {}
}
