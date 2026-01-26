import { DestroyRef, Directive, inject, OnInit, output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormGroupDirective } from '@angular/forms';

import { updateFormGroup } from '@shared';

@Directive({
  selector: 'form[appSubmit]'
})
export class Submit implements OnInit {
  // 跟随指令生命周期自动销毁订阅，避免路由切换后泄漏。
  private destroyRef = inject(DestroyRef);
  // 注入宿主表单指令，用于监听提交并读取有效性/值。
  private formGroup = inject(FormGroupDirective);
  // 仅在表单有效时向外输出表单值。
  readonly appSubmit = output<unknown>();

  ngOnInit(): void {
    // 监听表单提交事件，按有效性决定触发输出或标记控件。
    this.formGroup.ngSubmit.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      if (!this.formGroup.valid) {
        // 将无效控件标记出来，触发表单错误展示。
        updateFormGroup(Object.values(this.formGroup.control.controls));
      } else {
        // 只在表单通过校验时输出，保证下游逻辑安全。
        this.appSubmit.emit(this.formGroup.value);
      }
    });
  }
}
