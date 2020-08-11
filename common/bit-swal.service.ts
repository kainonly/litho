import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { BitService } from './bit.service';
import { AlertCustomize } from '../types';

@Injectable()
export class BitSwalService {
  static native: typeof Swal = Swal;

  constructor(
    private bit: BitService,
    private location: Location
  ) {
  }

  /**
   * Add response prompt box
   */
  addAlert(res: any, form: FormGroup, reset?: any, customize?: AlertCustomize): Observable<any> {
    return new Observable(subscriber => {
      if (!res.error) {
        Swal.fire({
          title: this.bit.l.operateSuccess,
          text: customize !== undefined && customize.text !== undefined
            ? customize.text
            : this.bit.l.addSuccessMsg,
          icon: 'success',
          showCancelButton: true,
          confirmButtonText:
            customize !== undefined && customize.confirmButtonText !== undefined
              ? customize.confirmButtonText
              : this.bit.l.addContinue,
          cancelButtonText:
            customize !== undefined && customize.cancelButtonText !== undefined
              ? customize.cancelButtonText
              : this.bit.l.operateBack
        }).then((result) => {
          if (result.value) {
            form.reset(reset ? reset : undefined);
            subscriber.next(true);
            subscriber.complete();
          } else {
            this.location.back();
            subscriber.next(false);
            subscriber.complete();
          }
        });
      } else {
        Swal.fire({
          title: this.bit.l.operateError,
          text: customize !== undefined && customize.errorText !== undefined
            ? customize.errorText
            : res.msg,
          icon: 'error',
          confirmButtonText: this.bit.l.operateOk
        }).then(() => {
          subscriber.next(null);
          subscriber.complete();
        });
      }
    });
  }

  /**
   * Edit response prompt box
   */
  editAlert(res: any, customize?: AlertCustomize): Observable<any> {
    return new Observable(subscriber => {
      if (!res.error) {
        Swal.fire({
          title: this.bit.l.operateSuccess,
          text: customize !== undefined && customize.text !== undefined
            ? customize.text
            : this.bit.l.editSuccessMsg,
          icon: 'success',
          showCancelButton: true,
          confirmButtonText:
            customize !== undefined && customize.confirmButtonText !== undefined
              ? customize.confirmButtonText
              : this.bit.l.editContinue,
          cancelButtonText:
            customize !== undefined && customize.cancelButtonText !== undefined
              ? customize.cancelButtonText
              : this.bit.l.operateBack
        }).then((result) => {
          if (result.value) {
            subscriber.next(true);
            subscriber.complete();
          } else {
            this.location.back();
            subscriber.next(false);
            subscriber.complete();
          }
        });
      } else {
        Swal.fire({
          title: this.bit.l.operateError,
          text: customize !== undefined && customize.errorText !== undefined
            ? customize.errorText
            : res.msg,
          icon: 'error',
          confirmButtonText: this.bit.l.operateOk
        }).then(() => {
          subscriber.next(null);
          subscriber.complete();
        });
      }
    });
  }

  /**
   * Delete response prompt box
   */
  deleteAlert(service: Observable<any>, customize?: AlertCustomize): Observable<any> {
    return new Observable(subscriber => {
      Swal.fire({
        title: this.bit.l.operateWarning,
        text: customize !== undefined && customize.text !== undefined
          ? customize.text
          : this.bit.l.deleteWarning,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText:
          customize !== undefined && customize.confirmButtonText !== undefined
            ? customize.confirmButtonText
            : this.bit.l.deleteYes,
        cancelButtonText:
          customize !== undefined && customize.cancelButtonText !== undefined
            ? customize.cancelButtonText
            : this.bit.l.deleteCancel
      }).then((result) => {
        if (result.value) {
          service.subscribe((res) => {
            subscriber.next(res);
            subscriber.complete();
          });
        } else {
          subscriber.next(null);
          subscriber.complete();
        }
      });
    });
  }
}
