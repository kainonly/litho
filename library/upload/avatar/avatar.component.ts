import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { WpxService } from '@weplanx/ng';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadChangeParam } from 'ng-zorro-antd/upload';

@Component({
  selector: 'wpx-upload-avatar',
  templateUrl: './avatar.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => WpxUploadAvatarComponent),
      multi: true
    }
  ]
})
export class WpxUploadAvatarComponent implements ControlValueAccessor {
  @Input() wpxExt?: string;
  @Input() wpxAccept: string[] = [];
  @Input() wpxFallback!: string;

  loading = false;
  url?: string;

  private onChange!: (value: string) => void;
  private onTouched!: () => void;

  constructor(public wpx: WpxService, private message: NzMessageService) {}

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  writeValue(v: any): void {
    this.url = v;
  }

  change(info: NzUploadChangeParam): void {
    if (info.type === 'start') {
      this.url = undefined;
      this.loading = true;
    }
    if (info.type === 'success') {
      this.url = Reflect.get(info.file.originFileObj!, 'key');
      this.onChange(this.url!);
      this.loading = false;
      this.message.success($localize`上传成功`);
    }
  }
}
