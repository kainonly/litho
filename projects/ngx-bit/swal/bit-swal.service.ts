import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Location } from '@angular/common';
import { AsyncSubject, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { BitService } from 'ngx-bit';
import { fromPromise } from 'rxjs/internal-compatibility';
import { AlertOption } from './types';

@Injectable()
export class BitSwalService {
  readonly ready: AsyncSubject<any> = new AsyncSubject();

  constructor(private bit: BitService, private location: Location) {}

  /**
   * 创建提示框
   */
  create(option: AlertOption): Observable<any> {
    const html = `
      <div class='ant-result-title ng-star-inserted'> ${option.title} </div>
      <div class='ant-result-subtitle ng-star-inserted'> ${option.content} </div>
    `;
    return this.ready.pipe(
      switchMap(plugin =>
        fromPromise(
          plugin.fire({
            heightAuto: false,
            html,
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
  addAlert(res: any, form: FormGroup, reset?: any): Observable<any> {
    return !res.error
      ? this.create({
          title: this.bit.l.AddAlertSuccessTitle,
          content: this.bit.l.AddAlertSuccessContent,
          type: 'success',
          okText: this.bit.l.AddAlertSuccessOk,
          cancelText: this.bit.l.AddAlertSuccessCancel
        }).pipe(
          map(result => {
            if (result.value) {
              form.reset(reset);
              return true;
            }
            this.location.back();
            return false;
          })
        )
      : this.create({
          title: this.bit.l.AddAlertErrorTitle,
          content: !res.msg ? this.bit.l.AddAlertErrorContent : res.msg,
          type: 'error',
          okText: this.bit.l.AddAlertErrorOk,
          cancelShow: false
        }).pipe(map(_ => null));
  }

  /**
   * 修改响应提示框
   */
  editAlert(res: any): Observable<any> {
    return !res.error
      ? this.create({
          title: this.bit.l.EditAlertSuccessTitle,
          content: this.bit.l.EditAlertSuccessContent,
          type: 'success',
          okText: this.bit.l.EditAlertSuccessOk,
          cancelText: this.bit.l.EditAlertSuccessCancel
        }).pipe(
          map(result => {
            if (result.value) {
              return true;
            }
            this.location.back();
            return false;
          })
        )
      : this.create({
          title: this.bit.l.EditAlertErrorTitle,
          content: !res.msg ? this.bit.l.EditAlertErrorContent : res.msg,
          type: 'error',
          okText: this.bit.l.EditAlertErrorOk,
          cancelShow: false
        }).pipe(map(_ => null));
  }

  /**
   * 删除响应提示框
   */
  deleteAlert(observable: Observable<any>): Observable<any> {
    return this.create({
      title: this.bit.l.DeleteAlertTitle,
      content: this.bit.l.DeleteAlertContent,
      type: 'question',
      okText: this.bit.l.DeleteAlertOk,
      okDanger: true,
      cancelText: this.bit.l.DeleteAlertCancel
    }).pipe(switchMap(result => (!result.value ? of() : observable)));
  }
}
