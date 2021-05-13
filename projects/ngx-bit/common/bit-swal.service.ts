import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Location } from '@angular/common';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { BitService } from './bit.service';
import { AlertOption } from '../typings';

@Injectable()
export class BitSwalService {
  static native: typeof Swal = Swal;

  constructor(
    private bit: BitService,
    private location: Location
  ) {
  }

  create(option: AlertOption): Observable<any> {
    return new Observable((observer) => {
      Swal.fire({
        heightAuto: false,
        html: `
          <div class="ant-result-title ng-star-inserted"> ${option.title} </div>
          <div class="ant-result-subtitle ng-star-inserted"> ${option.content} </div>
        `,
        icon: option.type,
        width: !option.width ? 520 : option.width,
        confirmButtonText: !option.okText ? 'ok' : option.okText,
        cancelButtonText: !option.cancelText ? 'cancel' : option.cancelText,
        buttonsStyling: false,
        showConfirmButton: option.okShow === undefined ? true : option.cancelShow,
        showCancelButton: option.cancelShow === undefined ? true : option.cancelShow,
        customClass: {
          popup: 'swal2-ant-modal',
          actions: 'ant-result-extra ng-star-inserted',
          confirmButton: 'ant-btn ant-btn-primary ' + (!option.okDanger ? '' : 'ant-btn-dangerous'),
          cancelButton: 'ant-btn'
        }
      }).then((result) => {
        observer.next(result.value);
        observer.complete();
      });
    });
  }

  /**
   * Add response prompt box
   */
  addAlert(res: any, form: FormGroup, reset?: any): Observable<any> {
    return !res.error ? this.create({
      title: this.bit.l.AddAlertSuccessTitle,
      content: this.bit.l.AddAlertSuccessContent,
      type: 'success',
      okText: this.bit.l.AddAlertSuccessOk,
      cancelText: this.bit.l.AddAlertSuccessCancel
    }).pipe(
      map(status => {
        if (status) {
          form.reset(reset ? reset : undefined);
          return true;
        }
        this.location.back();
        return false;
      })
    ) : this.create({
      title: this.bit.l.AddAlertErrorTitle,
      content: !res.msg ? this.bit.l.AddAlertErrorContent : res.msg,
      type: 'error',
      okText: this.bit.l.AddAlertErrorOk,
      cancelShow: false
    }).pipe(
      map(_ => null)
    );
  }

  /**
   * Edit response prompt box
   */
  editAlert(res: any): Observable<any> {
    return !res.error ? this.create({
      title: this.bit.l.EditAlertSuccessTitle,
      content: this.bit.l.EditAlertSuccessContent,
      type: 'success',
      okText: this.bit.l.EditAlertSuccessOk,
      cancelText: this.bit.l.EditAlertSuccessCancel
    }).pipe(
      map(status => {
        if (status) {
          return true;
        }
        this.location.back();
        return false;
      })
    ) : this.create({
      title: this.bit.l.EditAlertErrorTitle,
      content: (!res.msg ? this.bit.l.EditAlertErrorContent : res.msg),
      type: 'error',
      okText: this.bit.l.EditAlertErrorOk,
      cancelShow: false
    }).pipe(
      map(_ => null)
    );
  }

  /**
   * Delete response prompt box
   */
  deleteAlert(observable: Observable<any>): Observable<any> {
    return this.create({
      title: this.bit.l.DeleteAlertTitle,
      content: this.bit.l.DeleteAlertContent,
      type: 'question',
      okText: this.bit.l.DeleteAlertOk,
      okDanger: true,
      cancelText: this.bit.l.DeleteAlertCancel
    }).pipe(
      switchMap(status => !status ? of() : observable)
    );
  }
}
