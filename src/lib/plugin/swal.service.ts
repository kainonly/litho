import {Injectable} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {Location} from '@angular/common';
import {Observable} from 'rxjs';
import Swal from 'sweetalert2';
import {BitService} from '../common/bit.service';
import {AlertCustomize} from '../lib.types';

@Injectable()
export class SwalService {
  static native = Swal;

  constructor(
    private bit: BitService,
    private location: Location
  ) {
  }

  /**
   * Add a prompt to use the request
   */
  addAlert(res: any, form: FormGroup, reset?: any, customize?: AlertCustomize): Observable<any> {
    return new Observable(subscriber => {
      if (!res.error) {
        Swal.fire({
          title: this.bit.l.operateSuccess,
          text: customize && customize.text ? customize.text : this.bit.l.addSuccessMsg,
          icon: 'success',
          showCancelButton: true,
          confirmButtonText:
            customize && customize.confirmButtonText
              ? customize.confirmButtonText
              : this.bit.l.addContinue,
          cancelButtonText:
            customize && customize.cancelButtonText
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
          text: customize && customize.errorText ? customize.errorText : res.msg,
          icon: 'error',
          confirmButtonText: this.bit.l.operateOk
        }).then(() => {
          subscriber.next(false);
          subscriber.complete();
        });
      }
    });
  }

  /**
   * Edit a prompt to use the request
   */
  editAlert(res: any, customize?: AlertCustomize): Observable<any> {
    return new Observable(subscriber => {
      if (!res.error) {
        Swal.fire({
          title: this.bit.l.operateSuccess,
          text: customize && customize.text ? customize.text : this.bit.l.editSuccessMsg,
          icon: 'success',
          showCancelButton: true,
          confirmButtonText:
            customize && customize.confirmButtonText
              ? customize.confirmButtonText
              : this.bit.l.editContinue,
          cancelButtonText:
            customize && customize.cancelButtonText
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
          text: customize && customize.errorText ? customize.errorText : res.msg,
          icon: 'error',
          confirmButtonText: this.bit.l.operateOk
        }).then(() => {
          subscriber.next(false);
          subscriber.complete();
        });
      }
    });
  }

  /**
   * Delete a prompt to use the request
   */
  deleteAlert(service: Observable<any>, customize?: AlertCustomize): Observable<any> {
    return new Observable(subscriber => {
      Swal.fire({
        title: this.bit.l.operateWarning,
        text: customize && customize.text ? customize.text : this.bit.l.deleteWarning,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText:
          customize && customize.confirmButtonText ? customize.confirmButtonText : this.bit.l.deleteYes,
        cancelButtonText:
          customize && customize.cancelButtonText ? customize.cancelButtonText : this.bit.l.deleteCancel
      }).then((result) => {
        if (result.value) {
          service.subscribe((res) => {
            subscriber.next(res);
            subscriber.complete();
          });
        }
      });
    });
  }
}
