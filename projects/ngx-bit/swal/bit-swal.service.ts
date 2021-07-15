import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AsyncSubject, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { BitService } from 'ngx-bit';
import { fromPromise } from 'rxjs/internal-compatibility';

import { AlertOption, SwalFn } from './types';

@Injectable()
export class BitSwalService {
  readonly ready: AsyncSubject<SwalFn> = new AsyncSubject<SwalFn>();

  constructor(private bit: BitService, private location: Location) {}

  /**
   * 创建提示框
   */
  create(option: AlertOption): Observable<Record<string, unknown>> {
    return this.ready.pipe(
      switchMap(plugin =>
        fromPromise(
          plugin.fire({
            heightAuto: false,
            html: `
              <div class='ant-result-title ng-star-inserted'> ${option.title} </div>
              <div class='ant-result-subtitle ng-star-inserted'> ${option.content} </div>
            `,
            icon: option.type,
            width: option.width ?? 520,
            confirmButtonText: option.okText ?? 'ok',
            cancelButtonText: option.cancelText ?? 'cancel',
            buttonsStyling: false,
            showConfirmButton: option.okShow === undefined ? true : option.cancelShow,
            showCancelButton: option.cancelShow === undefined ? true : option.cancelShow,
            customClass: {
              popup: 'swal2-ant-modal',
              actions: 'ant-result-extra ng-star-inserted',
              confirmButton: `ant-btn ant-btn-primary ${!option.okDanger ? '' : 'ant-btn-dangerous'}`,
              cancelButton: 'ant-btn'
            }
          })
        )
      )
    );
  }

  /**
   * 新增响应提示框
   */
  addAlert(
    response: Record<string, unknown>,
    form: FormGroup,
    reset?: Record<string, unknown>
  ): Observable<boolean | null> {
    if (!response.error) {
      return this.create({
        title: this.bit.l.AddAlertSuccessTitle as string,
        content: this.bit.l.AddAlertSuccessContent as string,
        type: 'success',
        okText: this.bit.l.AddAlertSuccessOk as string,
        cancelText: this.bit.l.AddAlertSuccessCancel as string
      }).pipe(
        map(result => {
          if (result.value) {
            form.reset(reset);
            return true;
          }
          this.location.back();
          return false;
        })
      );
    }
    return this.create({
      title: this.bit.l.AddAlertErrorTitle as string,
      content: (!response.msg ? this.bit.l.AddAlertErrorContent : response.msg) as string,
      type: 'error',
      okText: this.bit.l.AddAlertErrorOk as string,
      cancelShow: false
    }).pipe(map(() => null));
  }

  /**
   * 修改响应提示框
   */
  editAlert(response: Record<string, unknown>): Observable<boolean | null> {
    if (!response.error) {
      return this.create({
        title: this.bit.l.EditAlertSuccessTitle as string,
        content: this.bit.l.EditAlertSuccessContent as string,
        type: 'success',
        okText: this.bit.l.EditAlertSuccessOk as string,
        cancelText: this.bit.l.EditAlertSuccessCancel as string
      }).pipe(
        map(result => {
          if (result.value) {
            return true;
          }
          this.location.back();
          return false;
        })
      );
    }

    return this.create({
      title: this.bit.l.EditAlertErrorTitle as string,
      content: (!response.msg ? this.bit.l.EditAlertErrorContent : response.msg) as string,
      type: 'error',
      okText: this.bit.l.EditAlertErrorOk as string,
      cancelShow: false
    }).pipe(map(() => null));
  }

  /**
   * 删除响应提示框
   */
  deleteAlert(observable: Observable<Record<string, unknown>>): Observable<Record<string, unknown>> {
    return this.create({
      title: this.bit.l.DeleteAlertTitle as string,
      content: this.bit.l.DeleteAlertContent as string,
      type: 'question',
      okText: this.bit.l.DeleteAlertOk as string,
      okDanger: true,
      cancelText: this.bit.l.DeleteAlertCancel as string
    }).pipe(switchMap(result => (!result.value ? of({}) : observable)));
  }
}
