import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadChangeParam } from 'ng-zorro-antd/upload';

@Component({
  selector: 'wpx-upload-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
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
  value?: string;

  private onChange!: (value: string) => void;
  private onTouched!: () => void;

  constructor(private message: NzMessageService) {}

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  writeValue(v: any): void {
    this.value = v;
  }

  change(info: NzUploadChangeParam): void {
    if (info.type === 'start') {
      this.value = undefined;
      this.loading = true;
    }
    if (info.type === 'success') {
      this.value = Reflect.get(info.file.originFileObj!, 'key');
      this.onChange(this.value!);
      this.loading = false;
      this.message.success('图片上传成功');
    }
  }
}
