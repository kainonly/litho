import {Injectable} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {Location} from '@angular/common';
import {Observable} from 'rxjs';
import Swal from 'sweetalert2';
import {BitService} from '../base/bit.service';
import {AlertCustomize} from '../types/alert-customize';

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
    return Observable.create((observer) => {
      if (!res.error) {
        Swal.fire({
          title: this.bit.l.operateSuccess,
          text: customize && customize.text ? customize.text : this.bit.l.addSuccessMsg,
          type: 'success',
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
            observer.next(true);
            observer.complete();
          } else {
            this.location.back();
            observer.next(false);
            observer.complete();
          }
        });
      } else {
        Swal.fire({
          title: this.bit.l.operateError,
          text: customize && customize.errorText ? customize.errorText : res.msg,
          type: 'error',
          confirmButtonText: this.bit.l.operateOk
        }).then(() => {
          observer.next(false);
          observer.complete();
        });
      }
    });
  }

  /**
   * Edit a prompt to use the request
   */
  editAlert(res: any, customize?: AlertCustomize): Observable<any> {
    return Observable.create((observer) => {
      if (!res.error) {
        Swal.fire({
          title: this.bit.l.operateSuccess,
          text: customize && customize.text ? customize.text : this.bit.l.editSuccessMsg,
          type: 'success',
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
            observer.next(true);
            observer.complete();
          } else {
            this.location.back();
            observer.next(false);
            observer.complete();
          }
        });
      } else {
        Swal.fire({
          title: this.bit.l.operateError,
          text: customize && customize.errorText ? customize.errorText : res.msg,
          type: 'error',
          confirmButtonText: this.bit.l.operateOk
        }).then(() => {
          observer.next(false);
          observer.complete();
        });
      }
    });
  }

  /**
   * Delete a prompt to use the request
   */
  deleteAlert(service: Observable<any>, customize?: AlertCustomize): Observable<any> {
    return Observable.create((observer) => {
      Swal.fire({
        title: this.bit.l.operateWarning,
        text: customize && customize.text ? customize.text : this.bit.l.deleteWarning,
        type: 'warning',
        showCancelButton: true,
        confirmButtonText:
          customize && customize.confirmButtonText ? customize.confirmButtonText : this.bit.l.deleteYes,
        cancelButtonText:
          customize && customize.cancelButtonText ? customize.cancelButtonText : this.bit.l.deleteCancel
      }).then((result) => {
        if (result.value) {
          service.subscribe((res) => {
            observer.next(res);
            observer.complete();
          });
        }
      });
    });
  }
}
